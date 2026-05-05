import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://127.0.0.1:3000', { waitUntil: 'networkidle2', timeout: 10000 });
    console.log("Wait for loading state to finish...");
    await new Promise(r => setTimeout(r, 3000));
    
    const content = await page.$eval('#root', el => el.innerHTML);
    if (!content.trim()) {
       console.log("ROOT IS EMPTY - blank screen");
    } else {
       console.log("ROOT HAS CONTENT. Length:", content.length);
       console.log("First 200 chars:", content.substring(0, 200));
    }
    await browser.close();
  } catch (err) {
    console.error("Puppeteer error:", err);
  }
})();
