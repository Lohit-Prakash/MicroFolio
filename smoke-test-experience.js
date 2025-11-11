import { chromium } from 'playwright';

const LOGIN_URL = 'https://myportfolio-50a76.web.app/#/login';
const ADMIN_URL = 'https://myportfolio-50a76.web.app/#/admin';
const TIMEOUT = 15000;

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const consoleLogs = [];

  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text, timestamp: new Date().toISOString() });
    if (!text.includes('JSHandle')) console.log(`[${msg.type().toUpperCase()}] ${text}`);
  });

  try {
    console.log('[TEST-EX] Opening login page');
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await page.waitForTimeout(1200);

    // login or set auth
    const userId = await page.$('input[placeholder="Enter your user ID"]');
    if (userId) {
      await userId.fill('sjlohitp');
      const pwd = await page.$('input[placeholder="Enter your password"]');
      await pwd.fill('123@321');
      const buttons = await page.$$('button');
      for (const b of buttons) {
        const t = await b.innerText();
        if (t.includes('Sign In')) { await b.click(); break; }
      }
      await page.waitForTimeout(1800);
    } else {
      await page.evaluate(() => { localStorage.setItem('isLoggedIn', 'true'); localStorage.setItem('userId','sjlohitp'); });
      await page.goto(ADMIN_URL, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
      await page.waitForTimeout(1200);
    }

    // Click Experience tab
    console.log('[TEST-EX] Navigating to Experience tab');
    const btns = await page.$$('button');
    for (const b of btns) {
      const t = (await b.innerText()).trim();
      if (t.includes('Experience')) { await b.click(); console.log('[TEST-EX] Clicked Experience'); break; }
    }
    await page.waitForTimeout(1200);

    // Find Edit button in Experience area
    console.log('[TEST-EX] Looking for Edit button');
    const allBtns = await page.$$('button');
    let editBtn = null;
    for (const b of allBtns) {
      const t = (await b.innerText()).toLowerCase();
      if (t.includes('edit')) { editBtn = b; console.log('[TEST-EX] Found Edit button'); break; }
    }

    if (editBtn) {
      await editBtn.click();
      await page.waitForTimeout(1200);
      const inputs = await page.$$('input[type="text"], textarea');
      console.log(`[TEST-EX] Found ${inputs.length} inputs`);
      if (inputs.length > 0) {
        const testVal = 'EXP_AUTOTEST_' + Date.now();
        await inputs[0].fill(testVal);
        console.log('[TEST-EX] Filled first input');
        await page.waitForTimeout(600);
        // find update/save
        const sb = await page.$$('button');
        for (const b of sb) {
          const t = (await b.innerText()).toLowerCase();
          if (t.includes('update') || t.includes('save')) {
            try {
              await b.click();
              console.log('[TEST-EX] Clicked Update (direct)');
            } catch (err) {
              // fallback to evaluate click if element is outside viewport
              try {
                await page.evaluate((el) => el.click(), b);
                console.log('[TEST-EX] Clicked Update (via evaluate)');
              } catch (err2) {
                console.error('[TEST-EX] Failed to click update button:', err2.message || err2);
              }
            }
            break;
          }
        }
        await page.waitForTimeout(3000);
      }
    } else {
      console.log('[TEST-EX] No Edit button found');
    }

    // Report logs
    console.log('\n[TEST-EX] Captured console logs:');
    consoleLogs.filter(l => !l.text.includes('JSHandle')).forEach((l,i) => console.log(`[${i}] [${l.type}] ${l.text}`));

    const debug = consoleLogs.filter(l => l.text.includes('[DEBUG]') || l.text.includes('updateExperience') || l.text.includes('updateFirestore'));
    console.log(`\n[TEST-EX] Debug-like logs count: ${debug.length}`);
    if (debug.length > 0) debug.forEach(d => console.log(`  - ${d.text}`));

  } catch (e) {
    console.error('[TEST-EX] Error:', e.message);
  } finally {
    await browser.close();
    console.log('[TEST-EX] Done');
  }
})();
