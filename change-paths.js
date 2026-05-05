import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/"\/([a-zA-Z0-9_-]+\.png)"/g, '"./$1"');
content = content.replace(/"https:\/\/images\.unsplash\.com\/photo-[^"]+"/g, '"./call-analysis.png"');
fs.writeFileSync('src/App.tsx', content, 'utf-8');
