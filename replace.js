import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
const replacements = {
  '/call-analysis.png': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  '/triggering-call.png': 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?q=80&w=2071&auto=format&fit=crop',
  '/daily-lead-followup.png': 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  '/appointment-ghl.png': 'https://images.unsplash.com/photo-1506784951206-a9fbc7c07da7?q=80&w=2068&auto=format&fit=crop',
  '/pipelines-movement.png': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  '/retell-agent.png': 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
  '/candidate.png': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop',
  '/recuriterd.png': 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
  '/scrapejobs.png': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
  '/jobs.png': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop',
  '/ats.png': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
  '/applications.png': 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
  '/messaging.png': 'https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=1974&auto=format&fit=crop',
  '/mohan.png': 'https://avatars.githubusercontent.com/u/1012108'
};
for (const [find, replace] of Object.entries(replacements)) {
  content = content.replaceAll(find, replace);
}
fs.writeFileSync('src/App.tsx', content, 'utf-8');
