import { createHash } from 'node:crypto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { headScript } from './src/lib/head-script.js';

/** Set BASE_PATH=/repo-name when deploying to a GitHub Pages project site instead of designkit.joeyoosenbrug.nl. */
const base = process.env.BASE_PATH ?? '';

/**
 * SvelteKit hashes its own inline scripts for the CSP, but not the script hooks.server.ts puts in <head>.
 * Hash the same string here, so the policy stays in sync when the kit's theme script changes.
 */
const headHash = `sha256-${createHash('sha256').update(headScript(base)).digest('base64')}`;

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ pages: 'dist', assets: 'dist', fallback: '404.html', precompress: false, strict: true }),
    paths: { base, relative: false },
    prerender: {
      entries: ['*', '/nl/'],
      // The playground passes its options to the preview page in the URL hash (#links=4&search=0).
      // That is not an anchor, so there is no element with that id. Any other missing anchor is still an error.
      handleMissingId: ({ path, message }) => {
        if (!path.endsWith('/header/preview/')) throw new Error(message);
      }
    },
    // GitHub Pages can't send headers, so prerendered pages get the policy as a <meta> tag.
    csp: {
      mode: 'hash',
      directives: {
        'default-src': ['self'],
        'script-src': ['self', headHash],
        // Svelte sets inline style attributes (CSS variables, transitions)
        'style-src': ['self', 'unsafe-inline'],
        'img-src': ['self', 'data:'],
        // Vite inlines small font subsets as data: URIs
        'font-src': ['self', 'data:'],
        'connect-src': ['self'],
        // the header playground shows a page of this site in an iframe
        'frame-src': ['self'],
        'object-src': ['none'],
        'base-uri': ['self'],
        'form-action': ['none']
      }
    }
  }
};
