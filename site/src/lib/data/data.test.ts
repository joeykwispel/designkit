import { describe, expect, it } from 'vitest';
import en from '../locales/en';
import nl from '../locales/nl';
import { highlight } from '../highlight';
import { componentKeys, samples } from './components';
import { exportKeys, exportPaths } from './kit';
import { sites } from './sites';
import { headerUsage, quickstart, stackKeys } from './stacks';
import { colorTokens, gaps, ratio, syntaxTokens } from './tokens';

// The pages join shared data (tokens, code samples) with text from the locale files by key or by position.
// These tests fail when one side gets an entry the other does not have.

describe.each([
  ['en', en],
  ['nl', nl]
])('text for the shared data (%s)', (_, text) => {
  it('explains every colour token', () => {
    expect(Object.keys(text.tokens.colors.uses).sort()).toEqual(colorTokens.map((t) => t.name).sort());
  });

  it('describes every component', () => {
    expect(Object.keys(text.components.items).sort()).toEqual([...componentKeys].sort());
  });

  it('describes every export and every site', () => {
    expect(Object.keys(text.home.exports).sort()).toEqual([...exportKeys].sort());
    expect(Object.keys(text.home.sites).sort()).toEqual(sites.map((s) => s.key).sort());
  });

  it('has one sentence per quick start step', () => {
    for (const stack of stackKeys) expect(text.quickstart[stack]).toHaveLength(quickstart[stack].length);
  });

  it('has a link label per section of the header preview', () => {
    expect(text.header.preview.links).toHaveLength(4);
  });
});

describe('the package it documents', () => {
  it('lists every public import path on the home page', async () => {
    const pkg = (await import('@joeykwispel/design-kit/package.json', { with: { type: 'json' } })).default as { exports: Record<string, unknown> };
    // also exported, but not something an app imports: the changelog, package.json and the JSON twin of /tokens
    const internal = ['./CHANGELOG.md', './package.json', './tokens.json'];
    const documented = Object.values(exportPaths).map((p) => `.${p}`);
    expect(
      Object.keys(pkg.exports)
        .filter((e) => !internal.includes(e))
        .sort()
    ).toEqual(documented.sort());
  });

  it('gives a contrast ratio for every syntax colour and none for a background', () => {
    for (const token of syntaxTokens) expect(ratio(token.name, 'dark')).toBeGreaterThan(1);
    expect(ratio('bg', 'dark')).toBeUndefined();
  });

  it('reports the contrast gaps the package test knows about, and no others', () => {
    expect(gaps.map((g) => `${g.theme}: ${g.token} on ${g.on}`)).toEqual(['light: syn-num on bg-2']);
  });
});

describe('code samples', () => {
  const blocks = [...stackKeys.flatMap((s) => [...quickstart[s].flat(), ...headerUsage[s]])];

  it.each(blocks.map((b) => [b.file, b] as const))('%s survives highlighting unchanged', (_, block) => {
    expect(
      highlight(block.code, block.lang)
        .map((t) => t.text)
        .join('')
    ).toBe(block.code);
  });

  it('only shows component markup that uses classes of the kit', () => {
    for (const key of componentKeys) expect(samples[key].html).toMatch(/class="/);
  });
});
