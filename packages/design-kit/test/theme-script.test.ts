// @vitest-environment jsdom
import { createHash } from 'node:crypto';
import { beforeEach, describe, expect, it } from 'vitest';
import { themeScript, themeScriptHash } from '../src/theme-script.js';

const run = () => new Function(themeScript)();

describe('theme script', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark';
    document.documentElement.className = '';
    document.cookie = 'jo-theme=; max-age=0; path=/';
    localStorage.clear();
  });

  it('has the CSP hash it exports', () => {
    expect(themeScriptHash).toBe(`sha256-${createHash('sha256').update(themeScript).digest('base64')}`);
  });

  it('leaves dark alone and marks the page as scripted', () => {
    run();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.classList.contains('js')).toBe(true);
  });

  it('prefers the shared cookie over localStorage', () => {
    localStorage.setItem('theme', 'dark');
    document.cookie = 'jo-theme=light; path=/';
    run();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('falls back to localStorage', () => {
    localStorage.setItem('theme', 'light');
    run();
    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('ignores anything that is not a theme', () => {
    localStorage.setItem('theme', 'purple');
    run();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });
});
