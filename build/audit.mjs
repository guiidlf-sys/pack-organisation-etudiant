import { chromium } from 'playwright';
import { pathToFileURL } from 'url';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 900, height: 1300 } });
await p.goto(pathToFileURL('/home/user/pack-organisation-etudiant/build/planner-print.html').href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const res = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('.page').forEach((el, i) => {
    const over = el.scrollHeight - el.clientHeight;
    const body = el.querySelector('.body');
    const bodyOver = body ? body.scrollHeight - body.clientHeight : 0;
    const r = el.getBoundingClientRect();
    // élément dépassant le cadre de page
    let clipped = 0;
    el.querySelectorAll('*').forEach((c) => {
      const cr = c.getBoundingClientRect();
      if (cr.bottom > r.bottom + 1 || cr.right > r.right + 1 || cr.top < r.top - 1) clipped++;
    });
    out.push({ page: i + 1, h: Math.round(r.height), pageOver: over, bodyOver, clipped });
  });
  return out;
});
console.table(res);
await b.close();
