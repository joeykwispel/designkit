// Generates static/og.png (1200 × 630): the share image (Open Graph / Twitter card), also used as the README banner.
// Same design as the portfolio's og.png. The colours come from the kit's tokens, so the image cannot drift from the site.
// Run it with `npm run og` (PW_CHANNEL=chrome uses your installed Chrome).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { tokens } from '@joeykwispel/design-kit/tokens';

const font = fileURLToPath(import.meta.resolve('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'));
const MONO = `data:font/woff2;base64,${readFileSync(font).toString('base64')}`;
const c = tokens.dark;

const css = `
  @font-face { font-family: Mono; src: url(${MONO}) format('woff2'); font-weight: 100 800; }
  * { box-sizing: border-box; margin: 0; }
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    font-family: Mono, monospace; color: ${c.text}; background-color: ${c.bg};
    background-image:
      radial-gradient(900px 560px at 92% -14%, color-mix(in srgb, ${c.accent2} 18%, transparent), transparent 60%),
      radial-gradient(760px 520px at -8% 112%, color-mix(in srgb, ${c.accent} 14%, transparent), transparent 60%),
      linear-gradient(${c.gridLine} 1px, transparent 1px),
      linear-gradient(90deg, ${c.gridLine} 1px, transparent 1px);
    background-size: auto, auto, 48px 48px, 48px 48px;
  }
  .top, .bottom { position: absolute; left: 72px; right: 72px; display: flex; align-items: center; justify-content: space-between; }
  .top { top: 64px; }
  .bottom { bottom: 64px; }
  .logo { font-weight: 800; font-size: 30px; padding: 8px 16px; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px;
          background: ${c.surface}; letter-spacing: -0.02em; }
  .logo b { color: ${c.accent}; }
  .prompt { font-size: 21px; padding: 8px 18px; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 999px; background: ${c.surface}; }
  .prompt b { color: ${c.accent}; font-weight: 500; }
  .prompt i { color: ${c.muted}; font-style: normal; }
  .middle { position: absolute; left: 72px; top: 212px; }
  h1 { font-size: 112px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
  .grad { background: linear-gradient(90deg, ${c.accent}, ${c.accent2}); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .sub { margin-top: 30px; font-size: 28px; font-weight: 700; }
  .sub i { color: ${c.synCom}; font-style: normal; font-weight: 500; }
  .code { margin-top: 26px; font-size: 22px; display: flex; align-items: center; }
  .kw { color: ${c.synKw}; } .fn { color: ${c.synFn}; } .str { color: ${c.synStr}; } .punc { color: ${c.synPunc}; }
  .caret { display: inline-block; width: 13px; height: 28px; margin-left: 6px; background: ${c.accent}; }
  .swatches { display: flex; gap: 10px; }
  .swatch { width: 44px; height: 44px; border-radius: 9px; border: 1px solid rgba(255, 255, 255, 0.12); }
  .url { font-size: 19px; font-weight: 600; color: ${c.accent}; }
`;

const swatches = [c.bg2, c.text, c.muted, c.accent, c.accent2, c.synStr, c.synNum, c.synFn];
const html = `
  <div class="top">
    <span class="logo">&lt;<b>JO</b>/&gt;</span>
    <span class="prompt"><b>joey@designkit</b><i>:~$</i> npm i</span>
  </div>
  <div class="middle">
    <h1>Design <span class="grad">kit</span></h1>
    <p class="sub"><i>/**</i> One design system, every subdomain <i>*/</i></p>
    <p class="code"><span><span class="kw">import</span> <span class="str">'@joeykwispel/design-kit/kit.css'</span><span class="punc">;</span></span><span class="caret"></span></p>
  </div>
  <div class="bottom">
    <div class="swatches">${swatches.map((s) => `<span class="swatch" style="background:${s}"></span>`).join('')}</div>
    <span class="url">designkit.joeyoosenbrug.nl</span>
  </div>`;

const browser = await chromium.launch({ channel: process.env.PW_CHANNEL });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(`<!doctype html><html><head><style>${css}</style></head><body>${html}</body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'static/og.png', type: 'png' });
await browser.close();
console.log('wrote static/og.png');
