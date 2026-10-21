const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projectRoot = 'f:/G_Development/All Project from Shadly Bhai/13. Dr. Hanif Towhid_ Sylhet_Medicine - Developer Handover/HanifWebsite/dr-hanif-towhid';
const badgePath = path.join(projectRoot, 'public/test_circular_badge.png');

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4); // count

  const entries = [];
  for (const img of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(img.buffer.length, 8); // size of image
    entry.writeUInt32LE(offset, 12); // offset
    offset += img.buffer.length;
    entries.push(entry);
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function generateAllFavicons() {
  const badgeBuffer = fs.readFileSync(badgePath);

  // Generate all sizes
  const s16 = await sharp(badgeBuffer).resize(16, 16).png().toBuffer();
  const s32 = await sharp(badgeBuffer).resize(32, 32).png().toBuffer();
  const s48 = await sharp(badgeBuffer).resize(48, 48).png().toBuffer();
  const s180 = await sharp(badgeBuffer).resize(180, 180).png().toBuffer();
  const s192 = await sharp(badgeBuffer).resize(192, 192).png().toBuffer();
  const s512 = await sharp(badgeBuffer).resize(512, 512).png().toBuffer();

  // Create ICO with 16, 32, 48
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: s16 },
    { width: 32, height: 32, buffer: s32 },
    { width: 48, height: 48, buffer: s48 },
  ]);

  // Write to public/
  fs.writeFileSync(path.join(projectRoot, 'public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(projectRoot, 'public/icon.png'), s32);
  fs.writeFileSync(path.join(projectRoot, 'public/icon-32.png'), s32);
  fs.writeFileSync(path.join(projectRoot, 'public/icon-48.png'), s48);
  fs.writeFileSync(path.join(projectRoot, 'public/apple-touch-icon.png'), s180);
  fs.writeFileSync(path.join(projectRoot, 'public/apple-icon.png'), s180);
  fs.writeFileSync(path.join(projectRoot, 'public/icon-192.png'), s192);
  fs.writeFileSync(path.join(projectRoot, 'public/icon-512.png'), s512);

  // Also replace src/app/favicon.ico
  fs.writeFileSync(path.join(projectRoot, 'src/app/favicon.ico'), icoBuffer);

  console.log('All favicon and icon files written successfully!');
  console.log('ICO size:', icoBuffer.length);
}

generateAllFavicons().catch(console.error);
