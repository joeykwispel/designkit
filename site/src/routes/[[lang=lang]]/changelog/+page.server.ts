import changelog from '@joeykwispel/design-kit/CHANGELOG.md?raw';
import { marked } from 'marked';

/**
 * Rendered while the site is built, so no markdown parser goes to the browser.
 * The file is the package's own CHANGELOG.md, not typed again here. Only the versions are shown:
 * the page has its own title and intro.
 */
export const load = () => ({
  html: marked.parse(changelog.slice(changelog.indexOf('\n## ')), { async: false })
});
