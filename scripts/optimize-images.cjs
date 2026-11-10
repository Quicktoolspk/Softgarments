const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");

const sourceArgument = process.argv[2] || "assets/images";
const sourceDirectory = path.resolve(process.cwd(), sourceArgument);
const outputDirectory = path.join(sourceDirectory, "webp");
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);

async function findImages(directory, imagePaths = []) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (entryPath !== outputDirectory) {
        await findImages(entryPath, imagePaths);
      }
    } else if (
      entry.isFile() &&
      supportedExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      imagePaths.push(entryPath);
    }
  }

  return imagePaths;
}

async function main() {
  const sourceStats = await fs.stat(sourceDirectory);
  if (!sourceStats.isDirectory()) {
    throw new Error(`Image source is not a directory: ${sourceDirectory}`);
  }

  const imagePaths = await findImages(sourceDirectory);

  for (const imagePath of imagePaths) {
    const relativePath = path.relative(sourceDirectory, imagePath);
    const outputPath = path.join(
      outputDirectory,
      `${relativePath.slice(0, -path.extname(relativePath).length)}.webp`
    );

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(imagePath).webp({ quality: 80 }).toFile(outputPath);
    console.log(`Created ${path.relative(process.cwd(), outputPath)}`);
  }

  console.log(`Optimized ${imagePaths.length} image(s) into ${outputDirectory}`);
}

main().catch((error) => {
  console.error("Image optimization failed:", error.message);
  process.exitCode = 1;
});
