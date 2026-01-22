const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

(async () => {
  const src = path.join(__dirname, 'input/mother-era-source.jpg');
  
  if (!fs.existsSync(src)) {
    console.error(`Error: Source image not found at ${src}`);
    process.exit(1);
  }

  const quality = 78;

  console.log('Processing images...');

  // A) Desktop 16:9
  await sharp(src)
    // Optional: adjust these extract values after preview to ensure left negative space and full subjects
    // .extract({ left: 0, top: 0, width: 3840, height: 2160 }) // if you need to pre-crop from a larger original
    .resize({ width: 1920, height: 1080, fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 4 })
    .toFile('public/mother-era-about.webp');
  console.log('Generated public/mother-era-about.webp');

  // B) Secondary 4:3
  await sharp(src)
    .resize({ width: 1200, height: 900, fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 4 })
    .toFile('public/mother-era-section.webp');
  console.log('Generated public/mother-era-section.webp');

  // C) Mobile 1:1
  await sharp(src)
    .resize({ width: 1080, height: 1080, fit: 'cover', position: 'attention' })
    .webp({ quality, effort: 4 })
    .toFile('public/mother-era-mobile.webp');
  console.log('Generated public/mother-era-mobile.webp');

  console.log('All images exported to /public successfully!');
})();
