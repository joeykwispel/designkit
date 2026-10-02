/** Types for header.js, so TypeScript apps can import it without `allowJs`. */

export interface HeaderLink {
  label: string;
  href: string;
  /** The page you are on. Links to #sections on the same page are marked automatically. */
  current?: boolean;
}

export interface HeaderLanguage {
  code: string;
  /** The same page in that language */
  href: string;
  current?: boolean;
}

export interface HeaderLabels {
  home: string;
  main: string;
  language: string;
  toLight: string;
  toDark: string;
  menu: string;
  search: string;
  /** Text of the "skip to content" link, for headers that render it. */
  skip?: string;
}

/** The portfolio's own wording for the header, so every app says the same thing. */
export const headerLabels: Record<'en' | 'nl', Required<HeaderLabels>>;

export function readTheme(): 'dark' | 'light';
export function setTheme(theme: 'dark' | 'light'): void;
export function initJoHeader(root?: HTMLElement | null, options?: { onSearch?: () => void }): () => void;
