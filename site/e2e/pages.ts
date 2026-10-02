/** Every page of the site, without the language prefix. Each exists at `path` (English) and `/nl` + `path` (Dutch). */
export const paths = ['/', '/tokens/', '/components/', '/header/', '/guidelines/', '/changelog/'];

export const pages = paths.flatMap((path) => [path, `/nl${path}`]);

/** The page the header playground shows in its frame. */
export const PREVIEW = '/header/preview/';
