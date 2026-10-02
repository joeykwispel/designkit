import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';

/** The package directory. Vitest runs from it; import.meta.url is not a file URL in the jsdom tests. */
export const root = resolve(process.cwd()) + sep;

/** A file of the package as text with LF line endings. */
export const read = (path: string) => readFileSync(root + path, 'utf8').replaceAll('\r\n', '\n');

/** Drops the comment block a CSS file opens with. */
export const withoutBanner = (css: string) => css.replace(/^\/\*[\s\S]*?\*\/\n/, '');
