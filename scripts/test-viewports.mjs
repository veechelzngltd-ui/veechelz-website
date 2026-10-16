import { chromium, devices } from 'playwright';

const viewports = [
  { name: 'Mobile', device: devices['iPhone 14 Pro Max'] },
  { name: 'Tablet', device: devices['iPad Air'] },
  { name: 'Desktop', viewport: { width: 1440, height: 900 } },
];

async function run() {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const context = await browser.newContext(vp.device ? { ...vp.device } : { viewport: vp.viewport });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `screenshot-${vp.name}.png`, fullPage: true });
    console.log(`Captured ${vp.name} viewport.`);
    await context.close();
  }
  await browser.close();
}

run();