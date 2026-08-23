/* Logo, image de profil et bannière — mêmes couleurs et polices que le planner. */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const IMG = path.resolve('dist/images');
const OUT = path.join(IMG, 'marque');
mkdirSync(OUT, { recursive: true });

const CSS = `
@import url('../../assets/fonts/fonts.css');
*{margin:0;padding:0;box-sizing:border-box}
body{overflow:hidden;-webkit-font-smoothing:antialiased}
.grad{background:linear-gradient(140deg,#3F55E0 0%,#6C4FE0 52%,#9061F0 100%)}
.mono{font-family:'Outfit',sans-serif;font-weight:800;color:#fff;letter-spacing:-.03em;line-height:1}
.name{font-family:'Outfit',sans-serif;font-weight:800;letter-spacing:-.01em;line-height:1}
.tag{font-family:'Inter',sans-serif;font-weight:400}
.blob{position:absolute;border-radius:50%;background:rgba(255,255,255,.10)}
`;

const shots = [
  ['logo-carre', 500, 500, `
    <div class="stage grad" style="width:500px;height:500px;position:relative;display:flex;
         align-items:center;justify-content:center;overflow:hidden">
      <div class="blob" style="width:300px;height:300px;right:-110px;top:-110px"></div>
      <div class="blob" style="width:190px;height:190px;left:-70px;bottom:-70px"></div>
      <div class="mono" style="font-size:210px;position:relative">SR</div>
    </div>`],

  ['logo-horizontal', 800, 240, `
    <div class="stage" style="width:800px;height:240px;background:#fff;display:flex;
         align-items:center;gap:28px;padding:0 40px">
      <div class="grad" style="width:132px;height:132px;border-radius:34px;display:flex;
           align-items:center;justify-content:center;flex:0 0 auto">
        <div class="mono" style="font-size:62px">SR</div>
      </div>
      <div>
        <div class="name" style="font-size:52px;color:#14142B">Studio Récap</div>
        <div class="tag" style="font-size:19px;color:#6E6B85;margin-top:10px">
          Des outils simples pour s’organiser
        </div>
      </div>
    </div>`],

  ['banniere', 1600, 400, `
    <div class="stage grad" style="width:1600px;height:400px;position:relative;display:flex;
         flex-direction:column;align-items:center;justify-content:center;overflow:hidden">
      <div class="blob" style="width:520px;height:520px;right:-160px;top:-210px"></div>
      <div class="blob" style="width:340px;height:340px;left:-120px;bottom:-160px"></div>
      <div class="name" style="font-size:72px;color:#fff;position:relative">Studio Récap</div>
      <div class="tag" style="font-size:25px;color:rgba(255,255,255,.9);margin-top:20px;position:relative">
        Plannings · Révisions · Organisation — à imprimer ou sur tablette
      </div>
    </div>`],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
for (const [name, w, h, body] of shots) {
  const tmp = path.join(IMG, `_${name}.html`);
  writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`);
  await page.setViewportSize({ width: w, height: h });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(200);
  await page.locator('.stage').screenshot({ path: path.join(OUT, `${name}.png`) });
  unlinkSync(tmp);
  console.log('marque :', name);
}
await browser.close();
