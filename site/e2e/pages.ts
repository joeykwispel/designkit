/** Every page of the site, without the language prefix. Each exists at `path` (English) and `/nl` + `path` (Dutch). */
export const paths = ['/'];

export const pages = paths.flatMap((path) => [path, `/nl${path}`]);
