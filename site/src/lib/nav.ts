/** The pages of the site in menu order. The labels are in the locale files under `nav`. */
export const nav = [
  { key: 'home', path: '/' },
  { key: 'tokens', path: '/tokens/' },
  { key: 'components', path: '/components/' },
  { key: 'header', path: '/header/' },
  { key: 'guidelines', path: '/guidelines/' },
  { key: 'changelog', path: '/changelog/' }
] as const;

export type PageKey = (typeof nav)[number]['key'];

/** The bare page the header playground shows in its iframe. It has no site header or footer of its own. */
export const PREVIEW_PATH = '/header/preview/';
