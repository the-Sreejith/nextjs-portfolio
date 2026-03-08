import sharp from "sharp";
import GifEncoder from "gif-encoder-2";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// The spritesheet is 2048x2048 but content is in 1536x1536 area (padded to power of 2)
// CSS: backgroundSize 1536x1536, container 256x256, 6 steps
// So actual content frame size = 2048 * (256/1536) ≈ 341.33px...
// Let's just scale the source to 1536x1536 first, then extract 256px frames
const CSS_SIZE = 1536;
const FRAME_SIZE = 256; // in CSS-scaled space
const COLS = 6;
const WAVE_ROW = 2; // y = 512 in CSS, the waving animation row
const FRAME_DELAY = 150; // faster for a nice GIF feel
const OUTPUT_SIZE = 256;

async function main() {
  const spritePath = path.join(ROOT, "public", "spritesheet.png");
  const outputPath = path.join(ROOT, "public", "wave.gif");

  // Scale spritesheet to the CSS-intended size
  const scaledBuffer = await sharp(spritePath)
    .resize(CSS_SIZE, CSS_SIZE, { kernel: "nearest" })
    .ensureAlpha()
    .raw()
    .toBuffer();

  console.log(`Spritesheet scaled to ${CSS_SIZE}x${CSS_SIZE}`);
  console.log(`Extracting wave row ${WAVE_ROW}, ${COLS} frames of ${FRAME_SIZE}x${FRAME_SIZE}`);

  const encoder = new GifEncoder(OUTPUT_SIZE, OUTPUT_SIZE, "neuquant");
  const stream = createWriteStream(outputPath);

  encoder.createReadStream().pipe(stream);
  encoder.setDelay(FRAME_DELAY);
  encoder.setRepeat(0);
  encoder.setQuality(10);
  encoder.start();

  for (let i = 0; i < COLS; i++) {
    const left = i * FRAME_SIZE;
    const top = WAVE_ROW * FRAME_SIZE;

    // Extract frame from the scaled buffer
    const frameBuffer = await sharp(scaledBuffer, {
      raw: { width: CSS_SIZE, height: CSS_SIZE, channels: 4 },
    })
      .extract({ left, top, width: FRAME_SIZE, height: FRAME_SIZE })
      .resize(OUTPUT_SIZE, OUTPUT_SIZE, { kernel: "nearest" })
      .raw()
      .toBuffer();

    encoder.addFrame(frameBuffer);
    console.log(`  Frame ${i + 1}/${COLS} (${left},${top})`);
  }

  encoder.finish();
  await new Promise((resolve) => stream.on("finish", resolve));
  console.log(`\nGIF saved to: ${outputPath}`);
}

main().catch(console.error);
