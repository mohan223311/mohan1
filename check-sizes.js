const fs = require('fs');
const files = fs.readdirSync('public');
files.forEach(f => {
  const stats = fs.statSync(`public/${f}`);
  console.log(`${f}: ${stats.size} bytes`);
});
