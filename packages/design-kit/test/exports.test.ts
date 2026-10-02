import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { read, root } from './helpers.ts';

const pkg = JSON.parse(read('package.json')) as { exports: Record<string, string | Record<string, string>> };
const targets = [...new Set(Object.values(pkg.exports).flatMap((target) => (typeof target === 'string' ? [target] : Object.values(target))))];

describe('package exports', () => {
  it.each(targets)('%s exists after the build', (target) => {
    expect(existsSync(root + target)).toBe(true);
  });

  it('are all in the published tarball, and the tests and scripts are not', () => {
    const out = execSync('npm pack --dry-run --json --ignore-scripts', { cwd: root, encoding: 'utf8' });
    const files = (JSON.parse(out) as { files: { path: string }[] }[])[0].files.map((f) => f.path);
    for (const target of targets) expect(files).toContain(target.replace(/^\.\//, ''));
    expect(files.filter((f) => f.startsWith('test/') || f.startsWith('scripts/'))).toEqual([]);
  });
});
