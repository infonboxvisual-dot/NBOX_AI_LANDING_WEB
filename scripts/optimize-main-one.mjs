// One-off: convert public/app/main-one/*.jpg masters → optimized /app/<target>.webp,
// refresh blur placeholders in src/data/imagePlaceholders.ts, back up masters, drop main-one.
// Reuses the same pipeline params as scripts/optimize-images.mjs.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'public', 'app', 'main-one');
const OUT_DIR = path.join(ROOT, 'public', 'app');
const BACKUP_DIR = path.join(ROOT, 'assets-source', 'app', 'originals');
const PLACEHOLDERS_FILE = path.join(ROOT, 'src', 'data', 'imagePlaceholders.ts');

const TARGET_WIDTH = 1280;
const TARGET_QUALITY = 78;
const PLACEHOLDER_WIDTH = 24;
const PLACEHOLDER_QUALITY = 40;

// main-one source filename (without ext) → target webp basename (matches /app/*.webp used in code)
const MAPPING = {
  'human': 'human-enhancer',
  'kitchen': 'kitchen',
  'material': 'material',
  'photo': 'photo-enhancer',
  'prompt': 'prompt',
  'ren sync': 'render-sync',
  'render': 'render',
  'texture lab': 'texture',
  'upscale': 'upscale',
  'video': 'video',
  'virtual stagging': 'virtual',
  'visual': 'visual',
};

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  await ensureDir(BACKUP_DIR);

  let placeholdersText = await fs.readFile(PLACEHOLDERS_FILE, 'utf8');
  const results = [];

  for (const [srcName, target] of Object.entries(MAPPING)) {
    const srcPath = path.join(SRC_DIR, `${srcName}.jpg`);
    const outWebp = path.join(OUT_DIR, `${target}.webp`);
    const buf = await fs.readFile(srcPath);
    const image = sharp(buf, { failOnError: false });
    const meta = await image.metadata();

    await image
      .clone()
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality: TARGET_QUALITY, effort: 5 })
      .toFile(outWebp);

    const placeholderBuf = await image
      .clone()
      .resize({ width: PLACEHOLDER_WIDTH })
      .webp({ quality: PLACEHOLDER_QUALITY, effort: 4 })
      .toBuffer();
    const placeholder = `data:image/webp;base64,${placeholderBuf.toString('base64')}`;

    // Replace the placeholder value for this key in-place (keeps other keys untouched).
    const key = `/app/${target}.webp`;
    const re = new RegExp(`('${escapeRegExp(key)}':\\s*')[^']*(',)`);
    if (!re.test(placeholdersText)) {
      console.warn(`[warn] placeholder key not found: ${key}`);
    } else {
      placeholdersText = placeholdersText.replace(re, `$1${placeholder}$2`);
    }

    // Back up master under target name for idempotent future runs of optimize-images.mjs.
    await fs.copyFile(srcPath, path.join(BACKUP_DIR, `${target}.jpg`));

    const [srcStat, webpStat] = await Promise.all([fs.stat(srcPath), fs.stat(outWebp)]);
    results.push({
      file: `${srcName}.jpg → ${target}.webp`,
      src: `${(srcStat.size / 1024 / 1024).toFixed(2)} MB (${meta.width}x${meta.height})`,
      webp: `${(webpStat.size / 1024).toFixed(1)} KB`,
      saving: `${(100 - (webpStat.size / srcStat.size) * 100).toFixed(1)}%`,
    });
  }

  await fs.writeFile(PLACEHOLDERS_FILE, placeholdersText, 'utf8');

  // Remove the heavy source folder from public (masters are backed up).
  await fs.rm(SRC_DIR, { recursive: true, force: true });

  console.log(JSON.stringify(results, null, 2));
  console.log(`\nDone. Masters backed up → ${path.relative(ROOT, BACKUP_DIR)}, main-one removed.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
