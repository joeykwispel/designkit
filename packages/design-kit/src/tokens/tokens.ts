/**
 * Every design token of joeyoosenbrug.nl. This is the only place a value is typed:
 * scripts/build.mjs generates the :root blocks of kit.css, tokens.json and tailwind.css from it.
 *
 * Only erasable TypeScript here, so Node can import this file directly during the build.
 */

export type TokenGroup = 'color' | 'effect' | 'chip' | 'syntax' | 'type' | 'shape' | 'motion' | 'layout';

/** A token with the same value in both themes. */
export interface BaseToken {
  /** CSS custom property name without the leading `--` */
  name: string;
  group: TokenGroup;
  value: string;
  /** Tailwind 4 theme variable this token is mapped to in tailwind.css */
  tailwind?: string;
}

/** A token with one value per theme. */
export interface ThemeToken {
  name: string;
  group: TokenGroup;
  dark: string;
  light: string;
  tailwind?: string;
}

export const baseTokens = [
  {
    name: 'font',
    group: 'type',
    value: "'Inter Variable', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    tailwind: 'font-sans'
  },
  {
    name: 'mono',
    group: 'type',
    value: "'JetBrains Mono Variable', 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    tailwind: 'font-mono'
  },
  { name: 'radius', group: 'shape', value: '14px', tailwind: 'radius-card' },
  { name: 'radius-sm', group: 'shape', value: '9px', tailwind: 'radius-control' },
  { name: 'ease', group: 'motion', value: 'cubic-bezier(0.22, 1, 0.36, 1)', tailwind: 'ease-jo' },
  { name: 'spring', group: 'motion', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { name: 'nav-h', group: 'layout', value: '60px' }
] as const satisfies readonly BaseToken[];

export const themeTokens = [
  { name: 'bg', group: 'color', dark: '#0a0e17', light: '#f4f6fb', tailwind: 'color-bg' },
  { name: 'bg-2', group: 'color', dark: '#111726', light: '#e9edf6', tailwind: 'color-bg-2' },
  { name: 'surface', group: 'color', dark: 'rgba(255, 255, 255, 0.04)', light: 'rgba(255, 255, 255, 0.72)', tailwind: 'color-surface' },
  { name: 'surface-2', group: 'color', dark: 'rgba(255, 255, 255, 0.08)', light: 'rgba(255, 255, 255, 0.96)', tailwind: 'color-surface-2' },
  { name: 'border', group: 'color', dark: 'rgba(255, 255, 255, 0.09)', light: 'rgba(20, 30, 60, 0.12)', tailwind: 'color-border' },
  { name: 'text', group: 'color', dark: '#e6e9f2', light: '#141b2d', tailwind: 'color-text' },
  { name: 'muted', group: 'color', dark: '#98a3b9', light: '#4b566d', tailwind: 'color-muted' },
  { name: 'accent', group: 'color', dark: '#7dd3c0', light: '#0f766e', tailwind: 'color-accent' },
  { name: 'accent-text', group: 'color', dark: '#7dd3c0', light: '#0b6259', tailwind: 'color-accent-text' },
  { name: 'accent-ink', group: 'color', dark: '#06201b', light: '#ffffff', tailwind: 'color-accent-ink' },
  { name: 'accent-2', group: 'color', dark: '#b49cff', light: '#6d4fd6', tailwind: 'color-accent-2' },
  { name: 'accent-2-text', group: 'color', dark: '#c3b1ff', light: '#5b3fc4', tailwind: 'color-accent-2-text' },
  { name: 'glow', group: 'effect', dark: 'rgba(125, 211, 192, 0.26)', light: 'rgba(15, 118, 110, 0.2)' },
  { name: 'shadow', group: 'effect', dark: '0 18px 50px rgba(0, 0, 0, 0.4)', light: '0 18px 40px rgba(30, 40, 80, 0.12)' },
  { name: 'chip-l', group: 'chip', dark: '68%', light: '30%' },
  { name: 'chip-bg-a', group: 'chip', dark: '0.16', light: '0.12' },
  { name: 'grid-line', group: 'effect', dark: 'rgba(255, 255, 255, 0.035)', light: 'rgba(20, 30, 60, 0.05)' },
  { name: 'syn-kw', group: 'syntax', dark: '#c792ea', light: '#8e3fc7' },
  { name: 'syn-str', group: 'syntax', dark: '#c3e88d', light: '#3b7a12' },
  { name: 'syn-num', group: 'syntax', dark: '#f78c6c', light: '#c2410c' },
  { name: 'syn-fn', group: 'syntax', dark: '#82aaff', light: '#2459d1' },
  { name: 'syn-prop', group: 'syntax', dark: '#7dd3c0', light: '#0b6259' },
  { name: 'syn-com', group: 'syntax', dark: '#7a879e', light: '#5f6b80' },
  { name: 'syn-punc', group: 'syntax', dark: '#89ddff', light: '#0e7490' }
] as const satisfies readonly ThemeToken[];

export type Theme = 'dark' | 'light';
export const themes: readonly Theme[] = ['dark', 'light'];

/** `accent-2-text` becomes `accent2Text` */
type Camel<S extends string> = S extends `${infer A}-${infer B}` ? `${A}${Capitalize<Camel<B>>}` : S;
const camel = (name: string) => name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase());

type BaseName = (typeof baseTokens)[number]['name'];
type ThemeName = (typeof themeTokens)[number]['name'];

export interface Tokens {
  /** Values that are the same in both themes: fonts, radii, easings, header height. */
  base: Record<Camel<BaseName>, string>;
  dark: Record<Camel<ThemeName>, string>;
  light: Record<Camel<ThemeName>, string>;
}

/**
 * The values as plain strings, for the places that cannot read CSS variables:
 * canvas and three.js, generated images, <meta name="theme-color">.
 */
export const tokens: Tokens = {
  base: Object.fromEntries(baseTokens.map((t) => [camel(t.name), t.value])) as Tokens['base'],
  dark: Object.fromEntries(themeTokens.map((t) => [camel(t.name), t.dark])) as Tokens['dark'],
  light: Object.fromEntries(themeTokens.map((t) => [camel(t.name), t.light])) as Tokens['light']
};
