// Runs in Node, so the Svelte plugin compiles the component for the server.
import { JSDOM } from 'jsdom';
import { renderToStaticMarkup } from 'react-dom/server';
import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import { headerLabels } from '../src/header.js';
import { JoHeader } from '../src/react/JoHeader.tsx';
import Header from '../src/svelte/Header.svelte';
import { read } from './helpers.ts';

// The header exists three times: plain HTML, Svelte and React. They must stay the same markup,
// because header.css and header.js are written against one structure.

/** The props that describe the example in header.html. */
const props = {
  links: [
    { label: 'Skills', href: '/en/', current: true },
    { label: 'Career', href: '/en/career/' },
    { label: 'My repos', href: '/en/repos/' },
    { label: 'Any repo', href: '/en/any-repo/' }
  ],
  languages: [
    { code: 'en', href: '/en/', current: true },
    { code: 'nl', href: '/nl/' }
  ],
  labels: headerLabels.en
};

/** Tags, attributes and text of the <header>, without comments, whitespace or framework-only attributes. */
function skeleton(html: string): string[] {
  const { document, Node, Element } = new JSDOM(html).window;
  const lines: string[] = [];
  const walk = (node: Node, depth: number) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.replace(/\s+/g, ' ').trim();
      if (text) lines.push(`${'  '.repeat(depth)}"${text}"`);
      return;
    }
    if (!(node instanceof Element)) return;
    const attrs = [...node.attributes]
      .filter((a) => !a.name.startsWith('data-sveltekit-'))
      .map((a) => `${a.name}="${a.value}"`)
      .sort();
    lines.push(`${'  '.repeat(depth)}<${node.tagName.toLowerCase()}${attrs.length ? ' ' + attrs.join(' ') : ''}>`);
    node.childNodes.forEach((child) => walk(child, depth + 1));
  };
  walk(document.querySelector('header.jo-nav')!, 0);
  return lines;
}

const plain = skeleton(read('src/header.html'));

describe('header markup', () => {
  it('has the expected shape in header.html', () => {
    expect(plain[0]).toBe('<header class="jo-nav">');
    expect(plain.filter((l) => l.includes('jo-nav__link'))).toHaveLength(4);
  });

  it('is the same in Svelte', () => {
    expect(skeleton(render(Header, { props }).body)).toEqual(plain);
  });

  it('is the same in React', () => {
    expect(skeleton(renderToStaticMarkup(<JoHeader {...props} />))).toEqual(plain);
  });

  it('renders the skip link in Svelte unless turned off', () => {
    expect(render(Header, { props }).body).toContain('<a class="skip" href="#main">Skip to content</a>');
    expect(render(Header, { props: { ...props, skip: false } }).body).not.toContain('class="skip"');
  });

  it('leaves out the menu and its burger when there are no links', () => {
    for (const html of [render(Header, { props: { ...props, links: [] } }).body, renderToStaticMarkup(<JoHeader {...props} links={[]} />)]) {
      expect(html).not.toContain('jo-nav__menu');
      expect(html).not.toContain('jo-nav__burger');
      expect(html).toContain('jo-nav__theme');
    }
  });
});
