/** The sites this design is made for. What each one is, is in the locale files under `home.sites`. */
export const sites = [
  { key: 'portfolio', name: 'Portfolio', url: 'https://joeyoosenbrug.nl', domain: 'joeyoosenbrug.nl', stack: 'SvelteKit' },
  { key: 'arcade', name: 'Arcade', url: 'https://arcade.joeyoosenbrug.nl', domain: 'arcade.joeyoosenbrug.nl', stack: 'SvelteKit' },
  { key: 'tools', name: 'Tools', url: 'https://tools.joeyoosenbrug.nl', domain: 'tools.joeyoosenbrug.nl', stack: 'SvelteKit' },
  { key: 'codeguessr', name: 'CodeGuessr', url: 'https://codeguessr.joeyoosenbrug.nl', domain: 'codeguessr.joeyoosenbrug.nl', stack: 'Angular' },
  { key: 'devcity', name: 'DevCity', url: 'https://devcity.joeyoosenbrug.nl', domain: 'devcity.joeyoosenbrug.nl', stack: 'Next.js + Tailwind' }
] as const;

export type SiteKey = (typeof sites)[number]['key'];
