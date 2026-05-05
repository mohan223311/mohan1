import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  await page.goto('https://endearing-dodol-f23b03.netlify.app');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
