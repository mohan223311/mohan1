import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/onError=\{.*?\}/gs, '');
fs.writeFileSync('src/App.tsx', content, 'utf-8');
