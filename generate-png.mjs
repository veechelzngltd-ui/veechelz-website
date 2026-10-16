import sharp from 'sharp';
import fs from 'fs';

const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1024" height="1024" fill="none">
  <!-- Warm Stone Background Canvas -->
  <rect width="100" height="100" rx="20" fill="#ECEAE5"/>
  
  <!-- Centered Dual-Blind Mark -->
  <g transform="translate(18, 18)">
    <!-- Deep Obsidian Shading Wing -->
    <polygon points="0,0 26,64 38,64 12,0" fill="#18181B"/>
    <!-- Warm Brass Day Layer -->
    <polygon points="26,0 52,64 64,64 38,0" fill="#B38F5B"/>
    <!-- Precision Slit -->
    <line x1="8" y1="30" x2="56" y2="30" stroke="#ECEAE5" stroke-width="2.5"/>
  </g>
</svg>
`;

async function convert() {
  await sharp(Buffer.from(svgString))
    .resize(1024, 1024)
    .png()
    .toFile('public/icon-1024.png');
  console.log('Saved high-res icon to public/icon-1024.png');
}

convert();