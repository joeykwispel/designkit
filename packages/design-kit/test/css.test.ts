import { describe, expect, it } from 'vitest';
import { baseTokens, themeTokens } from '../src/tokens/index.ts';
import { read, withoutBanner } from './helpers.ts';

// The fixtures are the files every app had vendored before the package existed.
// 1.0.0 has to produce the same CSS, so installing it changes nothing on screen.

describe('kit.css', () => {
  it('is byte for byte the jo-kit.css it replaces', () => {
    expect(withoutBanner(read('dist/kit.css'))).toBe(withoutBanner(read('test/fixtures/jo-kit.css')));
  });

  it('declares every token, and no token the source does not know', () => {
    const declared = new Set([...read('dist/kit.css').matchAll(/^\s+--([\w-]+):/gm)].map((m) => m[1]));
    // local custom properties of single components, not tokens
    for (const local of ['angle', 'pad']) declared.delete(local);
    expect([...declared].sort()).toEqual([...baseTokens, ...themeTokens].map((t) => t.name).sort());
  });
});

describe('header.css', () => {
  it('is the jo-header.css it replaces, plus the rule that lets `hidden` hide the Ctrl K button', () => {
    const added = '/* display: inline-flex would otherwise win over the hidden attribute */\n.jo-nav__search[hidden] {\n  display: none;\n}\n';
    const css = withoutBanner(read('src/header.css'));
    expect(css).toContain(added);
    expect(css.replace(added, '')).toBe(withoutBanner(read('test/fixtures/jo-header.css')));
  });
});

describe('tailwind.css', () => {
  const css = read('dist/tailwind.css');

  it('is the @theme block DevCity had typed by hand', () => {
    expect(css.slice(css.indexOf('@theme'))).toBe(read('test/fixtures/tailwind-theme.css'));
  });

  it('only points at tokens that exist', () => {
    const names = new Set<string>([...baseTokens, ...themeTokens].map((t) => t.name));
    const used = [...css.matchAll(/var\(--([\w-]+)\)/g)].map((m) => m[1]);
    expect(used.length).toBeGreaterThan(0);
    expect(used.filter((n) => !names.has(n))).toEqual([]);
  });
});
