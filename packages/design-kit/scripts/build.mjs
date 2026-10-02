// Builds dist/: kit.css with the token blocks filled in, tokens.json, tailwind.css, and the compiled
// tokens + React entries. Run with plain `node` (Node 24 imports the token source directly).
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { baseTokens, themeTokens, themes, tokens } from '../src/tokens/tokens.ts';
import { themeScript, themeScriptHash } from '../src/theme-script.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFileSync(root + path, 'utf8').replaceAll('\r\n', '\n');
const write = (path, content) => writeFileSync(root + path, content);

const MARKER = '/* @tokens */';

/** The three :root blocks, formatted the way Prettier would. */
function tokenBlocks() {
  const block = (selector, lines) => `${selector} {\n${lines.map((l) => `  ${l}`).join('\n')}\n}`;
  const theme = (name, selector) =>
    block(selector, [
      `color-scheme: ${name};`,
      ...themeTokens.flatMap((t, i) => [
        // the label sits in the first theme block only
        ...(name === themes[0] && t.group === 'syntax' && themeTokens[i - 1]?.group !== 'syntax' ? ['/* syntax colors */'] : []),
        `--${t.name}: ${t[name]};`
      ])
    ]);
  return [
    block(
      ':root',
      baseTokens.map((t) => `--${t.name}: ${t.value};`)
    ),
    theme('dark', ":root,\n:root[data-theme='dark']"),
    theme('light', ":root[data-theme='light']")
  ].join('\n\n');
}

/** Kit tokens as Tailwind 4 utilities: bg-bg, text-muted, border-border, font-mono, ... */
function tailwindTheme() {
  const lines = [...themeTokens, ...baseTokens].filter((t) => t.tailwind).map((t) => `  --${t.tailwind}: var(--${t.name});`);
  return `@theme inline {\n${lines.join('\n')}\n}\n`;
}

rmSync(root + 'dist', { recursive: true, force: true });
mkdirSync(root + 'dist');

const kit = read('src/kit.css');
if (kit.split(MARKER).length !== 2) throw new Error(`src/kit.css needs exactly one ${MARKER} marker`);
write('dist/kit.css', kit.replace(MARKER, tokenBlocks()));

write(
  'dist/tailwind.css',
  `/* @joeykwispel/design-kit: the kit's tokens as Tailwind 4 theme variables. Import it after tailwindcss and kit.css. */\n${tailwindTheme()}`
);
write('dist/tokens.json', JSON.stringify(tokens, null, 2) + '\n');

// The hash is a constant in the source, so apps can import it without Node's crypto. Keep it honest.
const hash = `sha256-${createHash('sha256').update(themeScript).digest('base64')}`;
if (hash !== themeScriptHash) throw new Error(`themeScriptHash in src/theme-script.js is stale. It should be '${hash}'`);

execFileSync(process.execPath, [fileURLToPath(import.meta.resolve('typescript/lib/tsc.js')), '-p', root + 'tsconfig.build.json'], { stdio: 'inherit' });

console.log('design-kit: built dist/');
