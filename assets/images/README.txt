SOFTGARMENTS — Image Folders
============================

Har section ki images alag folder mein hain.
Kal ko image change karne ke liye:

OPTION A (sab se aasan):
  Purani file ko delete karein, nayi photo SAME naam se save karein.
  Example: categories/bras.webp ko nayi bra photo se replace karein.

OPTION B (naya naam):
  Nayi file folder mein rakhein, phir assets/site-images.js mein path update karein.

FOLDERS:
  hero/         → 01.webp … 05.webp (hero carousel)
  categories/   → bras.webp, panties.webp, sets.webp, nighties.webp, bodyshaper.webp, lingerie.webp
  products/     → 01-everyday-comfort-bra.webp, 02-cotton-panty-pack.webp, etc.

LOGO:
  assets/logo.webp (header + footer)

CONFIG FILE (sab paths ek jagah):
  assets/site-images.js

Browser cache: image change na dikhe to hard refresh karein (Cmd+Shift+R / Ctrl+Shift+R).

WEBP OPTIMIZATION:
  Run `npm run optimize-images` from the project root to scan the project
  recursively (excluding dependencies and generated build folders). Supported
  raster images are converted to WebP using quality 80 and effort 6. Image
  references are updated and checked before originals are removed. A backup of
  originals is saved beside the project, and the size report is written to
  `image-optimization-report.json`. SVG files are left unchanged.
