// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { headerLabels, initJoHeader, readTheme, setTheme } from '../src/header.js';
import { read } from './helpers.ts';

const html = read('src/header.html');
let destroy = () => {};

function mount(options?: Parameters<typeof initJoHeader>[1]) {
  document.body.innerHTML = html;
  const root = document.querySelector<HTMLElement>('.jo-nav')!;
  destroy = initJoHeader(root, options);
  return {
    root,
    menu: root.querySelector('.jo-nav__menu')!,
    burger: root.querySelector<HTMLButtonElement>('.jo-nav__burger')!,
    theme: root.querySelector<HTMLButtonElement>('.jo-nav__theme')!,
    search: root.querySelector<HTMLButtonElement>('.jo-nav__search')!
  };
}

const key = (init: KeyboardEventInit) => document.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init }));

beforeEach(() => {
  document.documentElement.dataset.theme = 'dark';
  document.cookie = 'jo-theme=; max-age=0; path=/';
  localStorage.clear();
});

afterEach(() => {
  destroy();
  destroy = () => {};
});

describe('theme', () => {
  it('is dark until the visitor chooses', () => {
    expect(readTheme()).toBe('dark');
  });

  it('is stored in the jo-theme cookie, localStorage and on <html>', () => {
    setTheme('light');
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(document.cookie).toContain('jo-theme=light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(readTheme()).toBe('light');
  });

  it('reads the cookie before localStorage, because only the cookie is shared between subdomains', () => {
    localStorage.setItem('theme', 'dark');
    document.cookie = 'jo-theme=light; path=/';
    expect(readTheme()).toBe('light');
  });

  it('toggles from the button and swaps its label', () => {
    const { theme } = mount();
    expect(theme.getAttribute('aria-label')).toBe('Switch to light theme');
    theme.click();
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(theme.getAttribute('aria-label')).toBe('Switch to dark theme');
    theme.click();
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(theme.getAttribute('aria-label')).toBe('Switch to light theme');
  });
});

describe('mobile menu', () => {
  it('opens and closes from the burger', () => {
    const { menu, burger } = mount();
    burger.click();
    expect(menu.classList.contains('is-open')).toBe(true);
    expect(burger.getAttribute('aria-expanded')).toBe('true');
    burger.click();
    expect(menu.classList.contains('is-open')).toBe(false);
    expect(burger.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on Escape and when a link is chosen', () => {
    const { menu, burger } = mount();
    burger.click();
    key({ key: 'Escape' });
    expect(menu.classList.contains('is-open')).toBe(false);

    burger.click();
    const link = menu.querySelector('a')!;
    link.addEventListener('click', (e) => e.preventDefault());
    link.click();
    expect(menu.classList.contains('is-open')).toBe(false);
  });
});

describe('command menu', () => {
  it('stays hidden and unbound without onSearch', () => {
    const { search } = mount();
    expect(search.hidden).toBe(true);
    expect(key({ key: 'k', ctrlKey: true })).toBe(true);
  });

  it('shows the button and binds Ctrl K and Cmd K with onSearch', () => {
    const onSearch = vi.fn();
    const { search } = mount({ onSearch });
    expect(search.hidden).toBe(false);
    search.click();
    expect(key({ key: 'k', ctrlKey: true })).toBe(false);
    key({ key: 'K', metaKey: true });
    key({ key: 'k' });
    expect(onSearch).toHaveBeenCalledTimes(3);
  });
});

describe('cleanup', () => {
  it('removes every listener', () => {
    const onSearch = vi.fn();
    const { menu, burger, theme } = mount({ onSearch });
    destroy();
    burger.click();
    theme.click();
    key({ key: 'k', ctrlKey: true });
    expect(menu.classList.contains('is-open')).toBe(false);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(onSearch).not.toHaveBeenCalled();
  });

  it('does nothing without a header on the page', () => {
    document.body.innerHTML = '';
    expect(() => initJoHeader(null)()).not.toThrow();
  });
});

describe('labels', () => {
  it('has the same keys in English and Dutch, none empty', () => {
    expect(Object.keys(headerLabels.nl)).toEqual(Object.keys(headerLabels.en));
    for (const label of [...Object.values(headerLabels.en), ...Object.values(headerLabels.nl)]) expect(label.trim()).not.toBe('');
  });
});
