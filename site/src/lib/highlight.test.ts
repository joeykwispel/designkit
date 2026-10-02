import { describe, expect, it } from 'vitest';
import { highlight, type Lang } from './highlight';

const samples: [Lang, string][] = [
  ['sh', 'npm i @joeykwispel/design-kit --save-dev # the kit\n'],
  ['js', "import { initJoHeader } from '@joeykwispel/design-kit/header';\n// start it\nconst destroy = initJoHeader(root, { onSearch: () => open(42) });"],
  ['css', "@import '@joeykwispel/design-kit/kit.css' layer(base);\n.card { color: var(--accent-text); padding: 0.65rem 1.15rem; /* note */ }"],
  ['html', '<!-- skip link -->\n<a class="skip" href="#main">Skip to content</a>'],
  ['svelte', '<script lang="ts">\n  import { Header } from \'@joeykwispel/design-kit/svelte\';\n</script>\n\n<Header {links} labels={headerLabels.en} />']
];

const classes = (code: string, lang: Lang, cls: string) =>
  highlight(code, lang)
    .filter((t) => t.cls === cls)
    .map((t) => t.text);

describe('highlight', () => {
  it.each(samples)('%s: gives the code back unchanged', (lang, code) => {
    expect(
      highlight(code, lang)
        .map((t) => t.text)
        .join('')
    ).toBe(code);
  });

  it('colours a shell command, its flags and comments', () => {
    const [, code] = samples[0];
    expect(classes(code, 'sh', 'fn')).toEqual(['npm']);
    expect(classes(code, 'sh', 'prop')).toEqual(['--save-dev']);
    expect(classes(code, 'sh', 'com')).toEqual(['# the kit']);
  });

  it('colours JavaScript keywords, strings, calls and comments', () => {
    const [, code] = samples[1];
    expect(classes(code, 'js', 'kw')).toEqual(['import', 'from', 'const']);
    expect(classes(code, 'js', 'str')).toEqual(["'@joeykwispel/design-kit/header'"]);
    expect(classes(code, 'js', 'fn')).toEqual(['initJoHeader', 'open']);
    expect(classes(code, 'js', 'com')).toEqual(['// start it']);
    expect(classes(code, 'js', 'num-t')).toEqual(['42']);
  });

  it('does not colour a keyword inside a longer name', () => {
    expect(classes('const format = information;', 'js', 'kw')).toEqual(['const']);
  });

  it('colours CSS variables, properties and at-rules', () => {
    const [, code] = samples[2];
    expect(classes(code, 'css', 'kw')).toEqual(['@import']);
    expect(classes(code, 'css', 'prop')).toEqual(['color', '--accent-text', 'padding']);
    expect(classes(code, 'css', 'fn')).toEqual(['layer', 'var']);
    expect(classes(code, 'css', 'num-t')).toEqual(['0.65rem', '1.15rem']);
  });

  it('colours tags, attributes and comments in markup', () => {
    const [, code] = samples[3];
    expect(classes(code, 'html', 'kw')).toEqual(['<a', '</a']);
    expect(classes(code, 'html', 'prop')).toEqual(['class', 'href']);
    expect(classes(code, 'html', 'com')).toEqual(['<!-- skip link -->']);
  });
});
