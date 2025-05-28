// src/utils/getImages.js
import fs from 'fs';
import path from 'path';

export function getImages() {
  const imagesDir = path.join(process.cwd(), 'src/assets/images');
  const files = fs.readdirSync(imagesDir);
  return files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif') || file.endsWith('.svg') || file.endsWith('.webp') || file.endsWith('.avif'));
}
