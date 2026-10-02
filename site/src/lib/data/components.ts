/**
 * The classes of kit.css, each with the markup that shows it. The components page renders this markup live
 * and prints the same string as the code sample, so the two cannot differ. Descriptions are in the locale files.
 */

export const componentKeys = ['btn', 'btnPrimary', 'tag', 'glass', 'ring', 'caret', 'syntax', 'mono', 'focus', 'skip', 'srOnly', 'reveal'] as const;
export type ComponentKey = (typeof componentKeys)[number];

export interface Sample {
  /** The class or selector, as the title of the card */
  name: string;
  html: string;
  /** No live preview: the markup would not show anything in a card (the skip link is fixed to the top of the page). */
  codeOnly?: boolean;
}

export const samples: Record<ComponentKey, Sample> = {
  btn: {
    name: '.btn',
    html: `<a class="btn" href="#btn">Read the docs</a>\n<button class="btn" type="button">Copy</button>`
  },
  btnPrimary: {
    name: '.btn.btn-primary',
    html: `<a class="btn btn-primary" href="#btnPrimary">Get started</a>`
  },
  tag: {
    name: '.tag',
    html: `<span class="tag">TypeScript</span>\n<span class="tag">Svelte</span>\n<span class="tag">Tailwind</span>`
  },
  glass: {
    name: '.glass',
    html: `<div class="glass" style="padding: 1rem 1.2rem">\n  <h3>A frosted card</h3>\n  <p>The backdrop shows through.</p>\n</div>`
  },
  ring: {
    name: '.glass.ring',
    html: `<a class="glass ring" href="#ring" style="display: block; padding: 1rem 1.2rem; text-decoration: none">\n  <h3>A card you can click</h3>\n  <p>Hover or focus it.</p>\n</a>`
  },
  caret: {
    name: '.caret',
    html: `<p class="mono">joey@designkit:~$ ls<span class="caret" aria-hidden="true"></span></p>`
  },
  syntax: {
    name: '.kw .str .num-t .fn .prop .com .punc',
    html: `<pre class="mono"><span class="kw">const</span> <span class="prop">radius</span> <span class="punc">=</span> <span class="num-t">14</span><span class="punc">;</span> <span class="com">// px</span>\n<span class="fn">setTheme</span><span class="punc">(</span><span class="str">'light'</span><span class="punc">);</span></pre>`
  },
  mono: {
    name: '.mono',
    html: `<p class="mono">~/joey/skills.ts</p>`
  },
  focus: {
    name: ':focus-visible',
    html: `<button class="btn" type="button">Tab to me</button>`
  },
  skip: {
    name: '.skip',
    html: `<a class="skip" href="#main">Skip to content</a>`,
    codeOnly: true
  },
  srOnly: {
    name: '.sr-only',
    html: `<a class="btn" href="#srOnly">GitHub ↗<span class="sr-only"> (opens in a new tab)</span></a>`
  },
  reveal: {
    name: '.reveal',
    html: `<div class="glass reveal in" style="padding: 1rem 1.2rem">\n  <p>Fades in, rises 18px and sharpens.</p>\n</div>`
  }
};

/** Layout classes: shown as code only, because this whole page is already laid out with them. */
export const layout = `<section class="section">\n  <div class="container">\n    <div class="section-head">\n      <h2>&lt;Skills/&gt;</h2>\n      <p>One line about the section.</p>\n    </div>\n    …\n  </div>\n</section>`;

/** The one rule about frosted blur that is easy to get wrong. */
export const blur = `.panel {\n  -webkit-backdrop-filter: blur(14px);\n  backdrop-filter: blur(14px);\n}`;
