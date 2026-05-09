import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const inputPath = path.join(ROOT, 'public', 'landing_sketch_img.png');
const outAvif = path.join(ROOT, 'public', 'landing_sketch_img.avif');
const outWebp = path.join(ROOT, 'public', 'landing_sketch_img.webp');

async function main() {
  const input = await fs.readFile(inputPath);
  const image = sharp(input, { failOnError: false });

  // Keep quality conservative but visually stable for hero.
  await image
    .clone()
    .avif({ quality: 45, effort: 6 })
    .toFile(outAvif);

  await image
    .clone()
    .webp({ quality: 72, effort: 5 })
    .toFile(outWebp);

  const [pngStat, avifStat, webpStat] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(outAvif),
    fs.stat(outWebp),
  ]);

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      {
        input: { file: 'landing_sketch_img.png', bytes: pngStat.size },
        avif: { file: 'landing_sketch_img.avif', bytes: avifStat.size },
        webp: { file: 'landing_sketch_img.webp', bytes: webpStat.size },
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

