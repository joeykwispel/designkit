import { themeScript } from '@joeykwispel/design-kit/theme-script';
import type { Lang } from '$lib/highlight';
import { PACKAGE } from './kit';

/**
 * The code samples of the quick start and the header page, per stack. The sentence above each step is in the
 * locale files (`quickstart.<stack>` and `header.usage.<stack>`), matched by position.
 */

export const stackKeys = ['sveltekit', 'next', 'angular', 'html'] as const;
export type StackKey = (typeof stackKeys)[number];

export const stackNames: Record<StackKey, string> = {
  sveltekit: 'SvelteKit',
  next: 'Next.js + Tailwind',
  angular: 'Angular',
  html: 'Plain HTML'
};

export interface Block {
  file: string;
  lang: Lang;
  code: string;
}

const FONTS = '@fontsource-variable/inter @fontsource-variable/jetbrains-mono';

const svelteWrapper = `<script lang="ts">
  import { page } from '$app/state';
  import { Header, headerLabels } from '${PACKAGE}/svelte';

  // 'en' | 'nl', from wherever your app keeps it
  let { locale } = $props();

  const links = $derived([
    { label: 'Play', href: '/play/', current: page.url.pathname === '/play/' },
    { label: 'Scores', href: '/scores/', current: page.url.pathname === '/scores/' }
  ]);
  const languages = $derived([
    { code: 'en', href: '/', current: locale === 'en' },
    { code: 'nl', href: '/nl/', current: locale === 'nl' }
  ]);
</script>

<Header {links} {languages} labels={headerLabels[locale]} />`;

const reactUsage = `'use client';

import { usePathname } from 'next/navigation';
import { JoHeader, joHeaderLabels } from '${PACKAGE}/react';

export function SiteHeader({ locale }: { locale: 'en' | 'nl' }) {
  const path = usePathname();
  return (
    <JoHeader
      labels={joHeaderLabels[locale]}
      links={[
        { label: 'Skills', href: '/' + locale + '/', current: path === '/' + locale + '/' },
        { label: 'Career', href: '/' + locale + '/career/', current: path.endsWith('/career/') }
      ]}
      languages={[
        { code: 'en', href: '/en/', current: locale === 'en' },
        { code: 'nl', href: '/nl/', current: locale === 'nl' }
      ]}
    />
  );
}`;

const angularUsage = `import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JO_HEADER_LABELS, JoHeaderComponent } from './jo/jo-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, JoHeaderComponent],
  template: \`
    <a class="skip" href="#main">Skip to content</a>
    <jo-header [links]="links" [languages]="languages" [labels]="labels.en" />
    <main id="main"><router-outlet /></main>
  \`
})
export class App {
  protected readonly labels = JO_HEADER_LABELS;
  protected readonly links = [
    { label: 'Play', routerLink: '/en/play' },
    { label: 'Leaderboard', routerLink: '/en/leaderboard' }
  ];
  protected readonly languages = [
    { code: 'en', href: '/en/', current: true },
    { code: 'nl', href: '/nl/' }
  ];
}`;

const htmlInit = `<script type="module">
  import { initJoHeader } from './header.js';
  initJoHeader(document.querySelector('.jo-nav'));
</script>`;

/** Getting a new app onto the kit, step by step. */
export const quickstart: Record<StackKey, Block[][]> = {
  sveltekit: [
    [{ file: 'terminal', lang: 'sh', code: `npm i ${PACKAGE} ${FONTS}` }],
    [
      {
        file: 'src/routes/+layout.svelte',
        lang: 'svelte',
        code: `<script lang="ts">
  import '@fontsource-variable/inter';
  import '@fontsource-variable/jetbrains-mono';
  import '${PACKAGE}/kit.css';
  import '${PACKAGE}/header.css';
  import Header from '$lib/components/Header.svelte';

  let { children } = $props();
</script>

<Header locale="en" />
<main id="main">{@render children()}</main>`
      }
    ],
    [{ file: 'src/lib/components/Header.svelte', lang: 'svelte', code: svelteWrapper }],
    [
      {
        file: 'src/app.html',
        lang: 'html',
        code: `<html lang="en" data-theme="dark">
  <head>
    <meta name="theme-color" content="#0a0e17" />
    <script>
      %jo.theme%
    </script>
    %sveltekit.head%
  </head>`
      },
      {
        file: 'src/hooks.server.ts',
        lang: 'js',
        code: `import { themeScript } from '${PACKAGE}/theme-script';

export const handle = ({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: ({ html }) => html.replace(/<script>\\s*%jo\\.theme%\\s*<\\/script>/, () => '<script>' + themeScript + '</script>')
  });`
      }
    ]
  ],
  next: [
    [{ file: 'terminal', lang: 'sh', code: `pnpm add ${PACKAGE} ${FONTS}` }],
    [
      {
        file: 'app/globals.css',
        lang: 'css',
        code: `@import 'tailwindcss';
/* In the base layer the kit still wins over preflight, and your utilities win over the kit. */
@import '${PACKAGE}/kit.css' layer(base);
@import '${PACKAGE}/header.css';
/* bg-bg, text-muted, border-border, text-accent-text, font-mono, rounded-card, ... */
@import '${PACKAGE}/tailwind.css';`
      }
    ],
    [
      {
        file: 'app/[locale]/layout.tsx',
        lang: 'js',
        code: `import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '../globals.css';
import Script from 'next/script';
import { themeScript } from '${PACKAGE}/theme-script';
import { tokens } from '${PACKAGE}/tokens';
import { SiteHeader } from '@/components/site-header';

export const viewport = { themeColor: tokens.dark.bg };

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <body>
        <Script id="theme" strategy="beforeInteractive">{themeScript}</Script>
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}`
      }
    ],
    [{ file: 'components/site-header.tsx', lang: 'js', code: reactUsage }]
  ],
  angular: [
    [{ file: 'terminal', lang: 'sh', code: `npm i ${PACKAGE} ${FONTS}` }],
    [
      {
        file: 'src/styles.css',
        lang: 'css',
        code: `@import '@fontsource-variable/inter';
@import '@fontsource-variable/jetbrains-mono';
@import '${PACKAGE}/kit.css';
@import '${PACKAGE}/header.css';`
      }
    ],
    [
      {
        file: 'src/index.html',
        lang: 'html',
        code: `<html lang="en" data-theme="dark">
  <head>
    <meta name="theme-color" content="#0a0e17" />
    <script>
      ${themeScript}
    </script>
  </head>`
      }
    ],
    [{ file: 'src/app/app.ts', lang: 'js', code: angularUsage }]
  ],
  html: [
    [
      {
        file: 'terminal',
        lang: 'sh',
        code: `npm i ${PACKAGE}
# then copy these next to your page:
#   node_modules/${PACKAGE}/dist/kit.css
#   node_modules/${PACKAGE}/src/header.css
#   node_modules/${PACKAGE}/src/header.js`
      }
    ],
    [
      {
        file: 'index.html',
        lang: 'html',
        code: `<html lang="en" data-theme="dark">
  <head>
    <meta name="theme-color" content="#0a0e17" />
    <script>
      ${themeScript}
    </script>
    <link rel="stylesheet" href="kit.css" />
    <link rel="stylesheet" href="header.css" />
  </head>
  <body>
    <!-- the contents of header.html: skip link + header -->
    <main id="main">…</main>
    ${htmlInit.replaceAll('\n', '\n    ')}
  </body>
</html>`
      }
    ]
  ]
};

/** Only the header, for an app that already has the kit's CSS. */
export const headerUsage: Record<StackKey, Block[]> = {
  sveltekit: [{ file: 'src/lib/components/Header.svelte', lang: 'svelte', code: svelteWrapper }],
  next: [{ file: 'components/site-header.tsx', lang: 'js', code: reactUsage }],
  angular: [{ file: 'src/app/app.ts', lang: 'js', code: angularUsage }],
  html: [{ file: 'index.html', lang: 'html', code: htmlInit }]
};

export const commandMenu: Block = {
  file: 'any framework',
  lang: 'js',
  code: `import { initJoHeader } from '${PACKAGE}/header';

// Passing onSearch shows the Ctrl K button and binds Ctrl/Cmd+K.
const destroy = initJoHeader(document.querySelector('.jo-nav'), {
  onSearch: () => openCommandMenu()
});`
};
