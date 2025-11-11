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
    console.log('[TEST-EDU] Opening login page');
    await page.goto(LOGIN_URL, { waitUntil: 'domcontentloaded', timeout: TIMEOUT });
    await page.waitForTimeout(1200);

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

    // Click Education tab
    console.log('[TEST-EDU] Navigating to Education tab');
    const btns = await page.$$('button');
    for (const b of btns) {
      const t = (await b.innerText()).trim();
      if (t.includes('Education')) { await b.click(); console.log('[TEST-EDU] Clicked Education'); break; }
    }
    await page.waitForTimeout(1200);

    // Find Edit button in Education area: look for buttons inside card content (class p-6)
    console.log('[TEST-EDU] Looking for Edit button inside card content');
    const contentBtns = await page.$$('.p-6 button');
    console.log(`[TEST-EDU] .p-6 buttons found: ${contentBtns.length}`);
    // log outerHTML snippets for first few buttons to help identify which is Edit vs Delete
    for (let i = 0; i < Math.min(contentBtns.length, 4); i++) {
      try {
          const outer = await page.evaluate((el) => el.outerHTML, contentBtns[i]);
          console.log(`[TEST-EDU] .p-6 button[${i}] outerHTML snippet: ${outer.substring(0,1000)}`);
      } catch (e) {
        console.log('[TEST-EDU] Could not read outerHTML for button', i, e.message);
      }
    }
    // prefer a button whose innerHTML contains the edit icon (lucide-pen), otherwise fallback to first
    let editBtn = null;
    for (let i = 0; i < contentBtns.length; i++) {
      const outer = await page.evaluate((el) => el.outerHTML, contentBtns[i]);
      if (outer.includes('lucide-pen') || outer.toLowerCase().includes('pen')) {
        editBtn = contentBtns[i];
        console.log(`[TEST-EDU] Chosen edit button at index ${i} (matched lucide-pen)`);
        break;
      }
    }
    if (!editBtn && contentBtns.length > 0) {
      editBtn = contentBtns[0];
      console.log('[TEST-EDU] Chosen candidate Edit button: index 0 (fallback)');
    }

    if (editBtn) {
      // Hover the card area to reveal any hover-only buttons, then attempt click
      try {
        await page.hover('.p-6');
        await page.waitForTimeout(200);
      } catch (e) {
        // ignore hover errors
      }
      try {
        await editBtn.click();
        console.log('[TEST-EDU] Clicked Edit (direct)');
      } catch (err) {
        try {
          await page.evaluate((el) => el.click(), editBtn);
          console.log('[TEST-EDU] Clicked Edit (via evaluate)');
        } catch (err2) {
          console.error('[TEST-EDU] Failed to click Edit button:', err2.message || err2);
        }
      }
      await page.waitForTimeout(1200);
      const inputs = await page.$$('input[type="text"], textarea');
      console.log(`[TEST-EDU] Found ${inputs.length} inputs`);
      if (inputs.length > 0) {
        const testVal = 'EDU_AUTOTEST_' + Date.now();
        await inputs[0].fill(testVal);
        console.log('[TEST-EDU] Filled first input');
        await page.waitForTimeout(600);
        // find update/save
        const sb = await page.$$('button');
        for (const b of sb) {
          const t = (await b.innerText()).toLowerCase();
          if (t.includes('update') || t.includes('save')) {
            try {
              await b.click();
              console.log('[TEST-EDU] Clicked Update (direct)');
            } catch (err) {
              try {
                await page.evaluate((el) => el.click(), b);
                console.log('[TEST-EDU] Clicked Update (via evaluate)');
              } catch (err2) {
                console.error('[TEST-EDU] Failed to click update button:', err2.message || err2);
              }
            }
            break;
          }
        }
        await page.waitForTimeout(3000);
      }
    } else {
      console.log('[TEST-EDU] No Edit button found');
    }

    console.log('\n[TEST-EDU] Captured console logs:');
    consoleLogs.filter(l => !l.text.includes('JSHandle')).forEach((l,i) => console.log(`[${i}] [${l.type}] ${l.text}`));

    const debug = consoleLogs.filter(l => l.text.includes('[DEBUG]') || l.text.includes('updateEducation') || l.text.includes('updateFirestore'));
    console.log(`\n[TEST-EDU] Debug-like logs count: ${debug.length}`);
    if (debug.length > 0) debug.forEach(d => console.log(`  - ${d.text}`));

  } catch (e) {
    console.error('[TEST-EDU] Error:', e.message);
  } finally {
    await browser.close();
    console.log('[TEST-EDU] Done');
  }
})();
