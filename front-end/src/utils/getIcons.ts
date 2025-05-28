// src/utils/getIcons.js
import fs from 'fs';
import path from 'path';

export function getIcons() {
  const iconsDir = path.join(process.cwd(), 'src/assets/icons');
  const files = fs.readdirSync(iconsDir);
  return files.filter(file => file.endsWith('.svg')).map(file => file.replace('.svg', ''));
}
