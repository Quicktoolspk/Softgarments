const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const projectRoot = path.resolve(__dirname, "..");
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".nuxt",
  ".output",
  ".turbo",
  ".vercel",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
  "playwright-report",
  "storybook-static",
  "test-results",
  "vendor",
]);
const rasterExtensions = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".tif",
  ".tiff",
]);
const textExtensions = new Set([
  ".astro",
  ".cjs",
  ".conf",
  ".css",
  ".env",
  ".htm",
  ".html",
  ".ini",
  ".js",
  ".json",
  ".jsonc",
  ".jsonld",
  ".jsx",
  ".less",
  ".md",
  ".mjs",
  ".php",
  ".properties",
  ".ps1",
  ".py",
  ".sass",
  ".scss",
  ".sh",
  ".svelte",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".vue",
  ".webmanifest",
  ".xml",
  ".yaml",
  ".yml",
]);
const imageReferencePattern =
  /(?:https?:\/\/[^"'`\s<>]+|(?:\/|\.{1,2}\/)?[A-Za-z0-9_%~./-]+\.(?:png|jpe?g|gif|bmp|tiff?|webp|svg)(?:[?#][^"'`\s<>)]*)?)/gi;

function relativePath(filePath) {
  return path.relative(projectRoot, filePath).split(path.sep).join("/");
}

async function walk(directory, files = []) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(entryPath, files);
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function referenceVariants(imagePath, basenameCounts) {
  const relPath = relativePath(imagePath);
  const encodedPath = relPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  const variants = new Set([
    relPath,
    encodedPath,
    relPath.replaceAll("/", "\\"),
    relPath.replaceAll("/", "\\\\"),
  ]);
  const basename = path.posix.basename(relPath);
  if (basenameCounts.get(basename) === 1) variants.add(basename);
  return [...variants].sort((a, b) => b.length - a.length);
}

function imageTargetPath(imagePath) {
  return `${imagePath.slice(0, -path.extname(imagePath).length)}.webp`;
}

async function readTextFiles(files) {
  const textFiles = [];
  for (const filePath of files) {
    if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue;
    const contents = await fs.readFile(filePath, "utf8");
    textFiles.push({ filePath, contents });
  }
  return textFiles;
}

async function makeBackup(imagePaths) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDirectory = path.resolve(
    projectRoot,
    "..",
    `${path.basename(projectRoot)}-image-backup-${timestamp}`
  );
  await fs.mkdir(backupDirectory);

  for (const imagePath of imagePaths) {
    const backupPath = path.join(backupDirectory, relativePath(imagePath));
    await fs.mkdir(path.dirname(backupPath), { recursive: true });
    await fs.copyFile(imagePath, backupPath);
  }

  return backupDirectory;
}

async function convertImage(imagePath, outputPath) {
  const sourceMetadata = await sharp(imagePath).metadata();
  const isMultiPage = (sourceMetadata.pages || 1) > 1;
  const expectedWidth = sourceMetadata.width;
  const expectedHeight = isMultiPage
    ? sourceMetadata.pageHeight || sourceMetadata.height
    : sourceMetadata.height;

  if (!expectedWidth || !expectedHeight) {
    throw new Error(`Could not read image dimensions: ${relativePath(imagePath)}`);
  }

  const input = sharp(imagePath, { animated: isMultiPage });
  const webpOptions = {
    quality: 80,
    effort: 6,
  };
  if (isMultiPage) {
    if (sourceMetadata.loop !== undefined) webpOptions.loop = sourceMetadata.loop;
    if (sourceMetadata.delay !== undefined) webpOptions.delay = sourceMetadata.delay;
  }

  await input.webp(webpOptions).toFile(outputPath);
  const outputMetadata = await sharp(outputPath, {
    animated: isMultiPage,
  }).metadata();
  const outputHeight = isMultiPage
    ? outputMetadata.pageHeight || outputMetadata.height
    : outputMetadata.height;

  if (
    outputMetadata.width !== expectedWidth ||
    outputHeight !== expectedHeight ||
    (isMultiPage && (outputMetadata.pages || 1) !== sourceMetadata.pages)
  ) {
    throw new Error(
      `Image dimensions or frame count changed during conversion: ${relativePath(imagePath)}`
    );
  }

  const [originalStats, optimizedStats] = await Promise.all([
    fs.stat(imagePath),
    fs.stat(outputPath),
  ]);
  return {
    source: relativePath(imagePath),
    output: relativePath(outputPath),
    width: expectedWidth,
    height: expectedHeight,
    frames: sourceMetadata.pages || 1,
    originalBytes: originalStats.size,
    optimizedBytes: optimizedStats.size,
    savedBytes: originalStats.size - optimizedStats.size,
  };
}

function rewriteReferences(contents, replacements) {
  let updated = contents;
  for (const [source, target] of replacements) {
    updated = updated.replaceAll(source, target);
  }
  return updated;
}

function localImageReferences(contents) {
  return [...contents.matchAll(imageReferencePattern)].map((match) => match[0]);
}

async function verifyLocalReferences(textFiles) {
  const missing = [];

  for (const { filePath, contents } of textFiles) {
    for (const reference of localImageReferences(contents)) {
      if (/^(?:https?:)?\/\//i.test(reference) || /^data:/i.test(reference)) continue;

      let cleanReference;
      try {
        cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
      } catch {
        cleanReference = reference.split(/[?#]/, 1)[0];
      }
      const candidates = cleanReference.startsWith("/")
        ? [path.join(projectRoot, cleanReference.slice(1))]
        : [
            path.resolve(path.dirname(filePath), cleanReference),
            path.resolve(projectRoot, cleanReference),
          ];
      const existenceChecks = await Promise.all(
        candidates.map((candidate) =>
          fs.access(candidate).then(
            () => true,
            () => false
          )
        )
      );
      if (!existenceChecks.some(Boolean)) {
        missing.push(`${relativePath(filePath)} -> ${reference}`);
      }
    }
  }

  if (missing.length) {
    throw new Error(
      `Found ${missing.length} unresolved local image reference(s):\n${missing
        .slice(0, 25)
        .map((item) => `  ${item}`)
        .join("\n")}`
    );
  }
}

async function main() {
  const allFiles = await walk(projectRoot);
  const svgFiles = allFiles
    .filter((filePath) => path.extname(filePath).toLowerCase() === ".svg")
    .map(relativePath);
  const imagePaths = allFiles.filter((filePath) =>
    rasterExtensions.has(path.extname(filePath).toLowerCase())
  );

  const basenameCounts = new Map();
  for (const imagePath of imagePaths) {
    const basename = path.posix.basename(relativePath(imagePath));
    basenameCounts.set(basename, (basenameCounts.get(basename) || 0) + 1);
  }

  const targetCollisions = [];
  for (const imagePath of imagePaths) {
    const outputPath = imageTargetPath(imagePath);
    try {
      await fs.access(outputPath);
      targetCollisions.push({ imagePath, outputPath });
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  if (targetCollisions.length) {
    throw new Error(
      `Refusing to overwrite existing WebP file(s):\n${targetCollisions
        .map(({ imagePath, outputPath }) => `  ${relativePath(imagePath)} -> ${relativePath(outputPath)}`)
        .join("\n")}`
    );
  }

  const textFiles = await readTextFiles(allFiles);
  const referenceReplacements = [];
  const staleReferenceVariants = [];
  const replacementByImage = new Map();

  for (const imagePath of imagePaths) {
    const outputPath = imageTargetPath(imagePath);
    const sourceReferences = referenceVariants(imagePath, basenameCounts);

    for (const sourceReference of sourceReferences) {
      referenceReplacements.push([
        sourceReference,
        `${sourceReference.slice(0, -path.extname(imagePath).length)}.webp`,
      ]);
      staleReferenceVariants.push(sourceReference);
    }
    replacementByImage.set(imagePath, outputPath);
  }
  referenceReplacements.sort((a, b) => b[0].length - a[0].length);

  let backupDirectory = null;
  const converted = [];
  const changedTextFiles = [];

  try {
    if (imagePaths.length) backupDirectory = await makeBackup(imagePaths);

    for (const [imagePath, outputPath] of replacementByImage) {
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      converted.push(await convertImage(imagePath, outputPath));
      console.log(`Converted ${relativePath(imagePath)} -> ${relativePath(outputPath)}`);
    }

    for (const textFile of textFiles) {
      const updated = rewriteReferences(textFile.contents, referenceReplacements);
      if (updated !== textFile.contents) {
        await fs.writeFile(textFile.filePath, updated, "utf8");
        changedTextFiles.push({
          filePath: textFile.filePath,
          originalContents: textFile.contents,
          updatedContents: updated,
        });
      }
    }

    const staleReferences = [];
    for (const textFile of textFiles) {
      for (const variant of staleReferenceVariants) {
        if (textFile.contents.includes(variant)) {
          staleReferences.push(`${relativePath(textFile.filePath)} -> ${variant}`);
          break;
        }
      }
    }
    if (staleReferences.length) {
      throw new Error(
        `Could not rewrite every old image reference:\n${staleReferences
          .slice(0, 25)
          .map((item) => `  ${item}`)
          .join("\n")}`
      );
    }

    const changedFilesByPath = new Map(
      changedTextFiles.map((changed) => [changed.filePath, changed.updatedContents])
    );
    await verifyLocalReferences(
      textFiles.map(({ filePath, contents }) => ({
        filePath,
        contents: changedFilesByPath.get(filePath) || contents,
      }))
    );

    for (const imagePath of imagePaths) {
      await fs.unlink(imagePath);
    }

    const originalBytes = converted.reduce((sum, item) => sum + item.originalBytes, 0);
    const optimizedBytes = converted.reduce((sum, item) => sum + item.optimizedBytes, 0);
    const report = {
      generatedAt: new Date().toISOString(),
      quality: 80,
      effort: 6,
      convertedImageCount: converted.length,
      svgFilesSkipped: svgFiles,
      originalBytes,
      optimizedBytes,
      totalBytesSaved: originalBytes - optimizedBytes,
      savingsPercent: originalBytes
        ? Number((((originalBytes - optimizedBytes) / originalBytes) * 100).toFixed(2))
        : 0,
      backupDirectory: backupDirectory ? path.relative(projectRoot, backupDirectory) : null,
      images: converted,
    };
    const reportPath = path.join(projectRoot, "image-optimization-report.json");
    await fs.writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

    console.log(`\nOptimized ${converted.length} image(s).`);
    console.log(`Original size: ${(originalBytes / 1024 / 1024).toFixed(2)} MiB`);
    console.log(`Optimized size: ${(optimizedBytes / 1024 / 1024).toFixed(2)} MiB`);
    console.log(`Storage saved: ${((originalBytes - optimizedBytes) / 1024 / 1024).toFixed(2)} MiB`);
    console.log(`SVG files left unchanged: ${svgFiles.length}`);
    if (backupDirectory) console.log(`Originals backed up to: ${backupDirectory}`);
    console.log(`Report: ${relativePath(reportPath)}`);
  } catch (error) {
    for (const textFile of changedTextFiles.reverse()) {
      await fs.writeFile(textFile.filePath, textFile.originalContents, "utf8");
    }
    for (const outputPath of replacementByImage.values()) {
      await fs.unlink(outputPath).catch((cleanupError) => {
        if (cleanupError.code !== "ENOENT") throw cleanupError;
      });
    }
    throw error;
  }
}

main().catch((error) => {
  console.error("Image optimization failed:", error.message);
  process.exitCode = 1;
});
