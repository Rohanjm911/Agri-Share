const puppeteer = require('../frontend/node_modules/puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'assets', 'screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching Chrome from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,920',
      '--hide-scrollbars'
    ],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2
    }
  });

  const page = await browser.newPage();
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Helper to suppress how-it-works modal
  const suppressModals = async () => {
    await page.evaluate(() => {
      for (let i = 1; i <= 20; i++) {
        localStorage.setItem(`agrishare_how_it_works_shown_${i}`, 'true');
      }
    });
  };

  try {
    // 1. Landing Page
    console.log('[1/9] Capturing Homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '01_homepage.png'), fullPage: false });

    // 2. Equipment Marketplace
    console.log('[2/9] Capturing Marketplace...');
    await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '02_marketplace.png'), fullPage: false });

    // 3. Equipment Details
    console.log('[3/9] Capturing Equipment Details...');
    await page.goto('http://localhost:3000/equipment/28', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '03_equipment_details.png'), fullPage: false });

    // 4. Login Page
    console.log('[4/9] Capturing Login Page...');
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '04_login.png'), fullPage: false });

    // 5. Onboarding Modal
    console.log('[5/9] Capturing Kisan Onboarding Guide Modal...');
    await page.click('input[type="email"]', { clickCount: 3 });
    await page.type('input[type="email"]', 'gurpreet.singh@agrishare.com');
    await page.click('input[type="password"]', { clickCount: 3 });
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '05_kisan_onboarding_guide.png'), fullPage: false });

    // 6. Dismiss Modal and capture Owner Dashboard
    console.log('[6/9] Capturing Owner Dashboard...');
    // Click "Go to Dashboard" button or dismiss
    const dismissed = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const btn = buttons.find(b => b.textContent && (b.textContent.includes('Go to Dashboard') || b.textContent.includes('List My First Equipment')));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    await suppressModals();
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '06_owner_dashboard.png'), fullPage: false });

    // 7. Owner Machinery Management
    console.log('[7/9] Capturing Owner Equipment Management...');
    await page.goto('http://localhost:3000/my-equipment', { waitUntil: 'networkidle2', timeout: 30000 });
    await suppressModals();
    await sleep(2000);
    // Dismiss any open modal if still present
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close"]') || document.querySelector('.modal button');
      if (closeBtn) closeBtn.click();
    });
    await page.screenshot({ path: path.join(OUTPUT_DIR, '07_my_equipment.png'), fullPage: false });

    // 8. Renter Bookings
    console.log('[8/9] Logging in as Renter (Ramesh Sharma) and capturing Bookings...');
    await page.evaluate(() => {
      localStorage.clear();
      for (let i = 1; i <= 20; i++) {
        localStorage.setItem(`agrishare_how_it_works_shown_${i}`, 'true');
      }
    });
    await page.goto('http://localhost:3000/login', { waitUntil: 'networkidle2', timeout: 30000 });
    await sleep(1500);
    await page.type('input[type="email"]', 'ramesh.sharma@agrishare.com');
    await page.type('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
    await sleep(1500);
    await page.goto('http://localhost:3000/bookings', { waitUntil: 'networkidle2', timeout: 30000 });
    await suppressModals();
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '08_renter_bookings.png'), fullPage: false });

    // 9. Light Mode Marketplace
    console.log('[9/9] Capturing Light Mode Marketplace...');
    await page.evaluate(() => {
      localStorage.setItem('agrishare_theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.classList.remove('dark');
    });
    await page.goto('http://localhost:3000/equipment', { waitUntil: 'networkidle2', timeout: 30000 });
    await suppressModals();
    await sleep(2000);
    await page.screenshot({ path: path.join(OUTPUT_DIR, '09_light_mode_marketplace.png'), fullPage: false });

    console.log('✅ All 9 high-res screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
  }
}

capture();
