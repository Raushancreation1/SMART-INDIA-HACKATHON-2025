const fs = require('fs');
const { createCanvas } = require('canvas');
const path = require('path');

const images = [
  { name: 'sourcing', color: '#4CAF50', text: 'Sourcing' },
  { name: 'sorting', color: '#2196F3', text: 'Sorting' },
  { name: 'grading', color: '#FFC107', text: 'Grading' },
  { name: 'packaging', color: '#9C27B0', text: 'Packaging' },
  { name: 'dispatch', color: '#FF5722', text: 'Dispatch' },
  { name: 'delivery', color: '#009688', text: 'Delivery' },
];

const width = 400;
const height = 300;

// Create images directory if it doesn't exist
const dir = path.join(__dirname, '../../public/images/supply-chain');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

images.forEach(({ name, color, text }) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color + '33'; // Add some transparency
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.fillStyle = '#000';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(dir, `${name}.png`), buffer);
});

console.log('Generated placeholder images in', dir);
