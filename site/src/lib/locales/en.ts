/** Every piece of site text in English. nl.ts must have the same shape (checked by TypeScript and locales.test.ts). */
export default {
  meta: {
    title: 'Design kit | the design system of joeyoosenbrug.nl',
    description:
      'The design system behind joeyoosenbrug.nl and its subdomains: colours, type, components and the shared header, as one npm package. Shown live, in English and Dutch.',
    imageAlt: 'Design kit: the design system of joeyoosenbrug.nl'
  },
  ui: {
    copy: 'copy',
    copied: 'copied'
  },
  home: {
    title: 'One design kit,',
    titleAccent: 'every subdomain.',
    lead: 'The colours, type, components and header of joeyoosenbrug.nl as one npm package. Every app installs it, so they all look and behave the same. This site is built with it too.',
    start: 'Get started',
    source: 'Source on GitHub',
    newTab: '(opens in a new tab)',
    installTitle: 'Install',
    installIntro: 'One package, plus the two fonts it is designed around. The fonts are self-hosted, so no visitor is sent to Google.',
    exportsTitle: 'Contents',
    exportsIntro: 'Each part is its own import, so an app takes only what it uses.',
    exports: {
      kit: 'Tokens for both themes, base styles, the backdrop, buttons, tags and cards.',
      headerCss: 'The styles of the header. Classes start with jo-nav, so nothing clashes.',
      header: 'What the header does: scroll bar, mobile menu, theme switch, Ctrl K.',
      svelte: 'The header as a Svelte 5 component.',
      react: 'The header as a React component, for Next.js and friends.',
      html: 'The header as plain markup, for anything else.',
      tokens: 'Every token value as typed JavaScript, for canvas and generated images.',
      tailwind: 'The tokens as Tailwind 4 theme variables: bg-bg, text-muted, font-mono.',
      themeScript: 'The script that sets the theme before the first paint, and its CSP hash.'
    }
  },
  footer: {
    madeBy: 'Made by',
    source: 'Source',
    newTab: '(opens in a new tab)'
  },
  error: {
    notFound: 'page not found',
    line: 'This page does not exist (yet), or it got refactored away.',
    home: 'back to the kit'
  }
};
