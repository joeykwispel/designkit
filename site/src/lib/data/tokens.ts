import { baseTokens, contrast, themes, themeTokens, type Theme } from '@joeykwispel/design-kit/tokens';

/** What the token pages need on top of the package's own token list. No value is typed here. */

export { baseTokens, themes, themeTokens };
export type { Theme };

export const value = (name: string, theme: Theme): string => themeTokens.find((t) => t.name === name)?.[theme] ?? '';

/** Values a swatch can be painted with. Shadows and bare numbers are shown as text only. */
export const isColor = (v: string) => /^(#|rgba?\()/.test(v);

export const colorTokens = themeTokens.filter((t) => t.group !== 'syntax');
export const syntaxTokens = themeTokens.filter((t) => t.group === 'syntax');

/** Tokens used as text, with the background each one is read on. */
const readOn: Record<string, string> = {
  text: 'bg',
  muted: 'bg',
  'accent-text': 'bg',
  'accent-2-text': 'bg',
  'accent-ink': 'accent',
  ...Object.fromEntries(syntaxTokens.map((t) => [t.name, 'bg']))
};

/** WCAG 2.2 AA for normal text */
export const AA = 4.5;

/** Contrast of a text token on its usual background, or undefined for tokens that are not text. */
export function ratio(name: string, theme: Theme): number | undefined {
  const on = readOn[name];
  return on ? contrast(value(name, theme), value(on, theme)) : undefined;
}

export interface Gap {
  token: string;
  on: string;
  theme: Theme;
  ratio: number;
}

/** Every text token on every page background, in both themes, that does not reach AA. Shown as is, not hidden. */
export const gaps: Gap[] = themes.flatMap((theme) =>
  Object.keys(readOn)
    .filter((name) => name !== 'accent-ink')
    .flatMap((token) =>
      ['bg', 'bg-2'].map((on) => ({ token, on, theme, ratio: contrast(value(token, theme), value(on, theme)) })).filter((gap) => gap.ratio < AA)
    )
);

export const format = (n: number) => `${n.toFixed(2)}:1`;
