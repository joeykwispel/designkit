import { describe, expect, it } from 'vitest';
import { contrast, themes, themeTokens, tokens } from '../src/tokens/index.ts';
import { read } from './helpers.ts';

describe('tokens', () => {
  it('exposes camelCase keys per theme', () => {
    expect(tokens.dark.bg).toBe('#0a0e17');
    expect(tokens.light.bg2).toBe('#e9edf6');
    expect(tokens.dark.accent2Text).toBe('#c3b1ff');
    expect(tokens.base.navH).toBe('60px');
    expect(Object.keys(tokens.dark)).toEqual(Object.keys(tokens.light));
  });

  it('writes the same values to tokens.json', () => {
    expect(JSON.parse(read('dist/tokens.json'))).toEqual(tokens);
  });
});

describe('contrast', () => {
  it('matches known ratios', () => {
    expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrast('#ffffff', '#ffffff')).toBe(1);
    expect(contrast('#777', '#fff')).toBeCloseTo(4.48, 2);
  });

  it('paints translucent colors over the backdrop first', () => {
    expect(contrast('#000', 'rgba(255, 255, 255, 0.5)', '#000')).toBeCloseTo(contrast('#000000', '#808080'), 1);
  });

  // WCAG 2.2 AA for normal text
  const AA = 4.5;
  const text = ['text', 'muted', 'accent-text', 'accent-2-text', ...themeTokens.filter((t) => t.group === 'syntax').map((t) => t.name)];
  const value = (name: string, theme: (typeof themes)[number]) => themeTokens.find((t) => t.name === name)![theme];

  /**
   * Pairs that miss AA in the values the kit was born with. 1.0.0 keeps every value as it was, so they are
   * listed instead of fixed. The test below fails once a pair is fixed, as a reminder to take it off this list.
   */
  const knownGaps = ['light: syn-num on bg-2'];

  for (const theme of themes) {
    for (const bg of ['bg', 'bg-2']) {
      for (const name of text) {
        const pair = `${theme}: ${name} on ${bg}`;
        const ratio = contrast(value(name, theme), value(bg, theme));
        if (knownGaps.includes(pair)) {
          it(`${pair} is a known gap, still below AA`, () => {
            expect(ratio).toBeLessThan(AA);
            expect(ratio).toBeGreaterThanOrEqual(4);
          });
        } else {
          it(`${pair} is readable`, () => expect(ratio).toBeGreaterThanOrEqual(AA));
        }
      }
    }

    it.each(text)(`${theme}: %s is readable on a card (surface over bg)`, (name) => {
      expect(contrast(value(name, theme), value('surface', theme), value('bg', theme))).toBeGreaterThanOrEqual(AA);
    });

    it(`${theme}: accent-ink is readable on accent`, () => {
      expect(contrast(value('accent-ink', theme), value('accent', theme))).toBeGreaterThanOrEqual(AA);
    });
  }
});
