/** Facts about the package that are the same in every language. The words around them live in the locale files. */

export const PACKAGE = '@joeykwispel/design-kit';
export const INSTALL = `npm i ${PACKAGE} @fontsource-variable/inter @fontsource-variable/jetbrains-mono`;
export const REPO = 'https://github.com/joeykwispel/designkit';

/** Every import path of the package, in the order the home page lists them. The keys match `exports` in the locale files. */
export const exportKeys = ['kit', 'headerCss', 'header', 'svelte', 'react', 'html', 'tokens', 'tailwind', 'themeScript'] as const;
export type ExportKey = (typeof exportKeys)[number];

export const exportPaths: Record<ExportKey, string> = {
  kit: '/kit.css',
  headerCss: '/header.css',
  header: '/header',
  svelte: '/svelte',
  react: '/react',
  html: '/header.html',
  tokens: '/tokens',
  tailwind: '/tailwind.css',
  themeScript: '/theme-script'
};
