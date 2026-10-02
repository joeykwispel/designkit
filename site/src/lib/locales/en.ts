/** Every piece of site text in English. nl.ts must have the same shape (checked by TypeScript and locales.test.ts). */
export default {
  meta: {
    title: 'Design kit | the design system of joeyoosenbrug.nl',
    description:
      'The design system behind joeyoosenbrug.nl and its subdomains: colours, type, components and the shared header, as one npm package. Shown live, in English and Dutch.',
    imageAlt: 'Design kit: the design system of joeyoosenbrug.nl',
    /** Page titles are "<page> | Design kit" */
    suffix: 'Design kit'
  },
  nav: {
    home: 'Overview',
    tokens: 'Tokens',
    components: 'Components',
    header: 'Header',
    guidelines: 'Guidelines',
    changelog: 'Changelog'
  },
  ui: {
    copy: 'copy',
    copied: 'copied',
    preview: 'preview',
    stack: 'Choose your stack',
    dark: 'Dark',
    light: 'Light',
    scroll: 'scrolls sideways'
  },
  home: {
    title: 'One design kit,',
    titleAccent: 'every subdomain.',
    lead: 'The colours, type, components and header of joeyoosenbrug.nl as one npm package. Every app installs it, so they all look and behave the same. This site is built with it too.',
    start: 'Get started',
    source: 'Source on GitHub',
    newTab: '(opens in a new tab)',
    installTitle: 'Install',
    installIntro: 'One package, plus the two fonts it is designed around. The fonts are self-hosted, so no visitor is sent to Google.',
    quickTitle: 'QuickStart',
    quickIntro: 'From an empty app to the right colours, fonts and header. Pick the stack you are on.',
    exportsTitle: 'Contents',
    exportsIntro: 'Each part is its own import, so an app takes only what it uses.',
    exports: {
      kit: 'Tokens for both themes, base styles, the backdrop, buttons, tags and cards.',
      headerCss: 'The styles of the header. Classes start with jo-nav, so nothing clashes.',
      header: 'What the header does: scroll bar, mobile menu, theme switch, Ctrl K.',
      svelte: 'The header as a Svelte 5 component.',
      react: 'The header as a React component, for Next.js and friends.',
      html: 'The header as plain markup, for anything else.',
      tokens: 'Every token value as typed JavaScript, for canvas and generated images.',
      tailwind: 'The tokens as Tailwind 4 theme variables: bg-bg, text-muted, font-mono.',
      themeScript: 'The script that sets the theme before the first paint, and its CSP hash.'
    },
    sitesTitle: 'Sites',
    sitesIntro: 'The sites this design is made for. They share one theme: switch to light on one and the others follow.',
    sites: {
      portfolio: 'Where the design was born. Everything here started as its stylesheet.',
      arcade: 'Small browser games, each in a different language.',
      tools: 'Developer tools that run in your browser.',
      codeguessr: 'Guess the language from a snippet of code.',
      devcity: 'My skills as a 3D city at night.'
    }
  },
  quickstart: {
    sveltekit: [
      'Install the kit and the fonts.',
      'Load the fonts and the two stylesheets once, in the root layout.',
      'Write a small header of your own that hands your links and languages to the kit’s header.',
      'Set the theme before the first paint. app.html is a static file, so a server hook fills the script in.'
    ],
    next: [
      'Install the kit and the fonts.',
      'Import the kit after Tailwind. tailwind.css turns the tokens into utilities.',
      'Load the fonts, set the theme before the first paint and render the header in the layout.',
      'The header needs the current path, so it lives in a small client component.'
    ],
    angular: [
      'Install the kit and the fonts.',
      'Import everything in the global stylesheet.',
      'Paste the theme script in <head>, before any CSS. index.html cannot import it; this is the exact script the package exports.',
      'Copy the header component from the Header page into src/app/jo/ and use it in the root component.'
    ],
    html: [
      'Install the kit, then copy the three files you need next to your page.',
      'Theme script first, then the stylesheets, then the header markup, then start it.'
    ]
  },
  tokens: {
    title: 'Tokens',
    description: 'Every colour, font, size and easing of joeyoosenbrug.nl, in both themes, with contrast ratios. Read straight from the package.',
    intro:
      'Every value on this page is read from the package, so what you see is what you install. Never hard-code a colour in a component: use the token, and both themes keep working.',
    colors: {
      title: 'Colors',
      path: '~/designkit/tokens.ts',
      intro:
        'Two themes, switched with data-theme on <html>. Dark is the default. The ratio next to a text colour is its contrast on the page background of that theme.',
      token: 'Token',
      use: 'Use',
      uses: {
        bg: 'Page background, also <meta name="theme-color">',
        'bg-2': 'Solid panels on top of the page: dropdowns, popovers',
        surface: 'Cards, buttons, inputs',
        'surface-2': 'Hover state of a surface',
        border: 'All 1px borders',
        text: 'Body text, headings',
        muted: 'Secondary text, inactive links, meta',
        accent: 'Brand teal: primary button, active pill, caret, bars',
        'accent-text': 'Teal as text: links, numbers',
        'accent-ink': 'Text on a teal background',
        'accent-2': 'Second brand colour, purple: gradients, highlights',
        'accent-2-text': 'Purple as text: badges, "draft"',
        glow: 'The 4px ring on hover: box-shadow: 0 0 0 4px var(--glow)',
        shadow: 'Cards and dropdowns',
        'chip-l': 'Lightness of a coloured chip, for hsl() with your own hue',
        'chip-bg-a': 'Opacity of that chip’s background',
        'grid-line': 'The faint background grid'
      },
      gradient: 'Gradients always run teal to purple, left to right.',
      mixing: 'For a tinted border or a soft fill, mix the accent instead of inventing a colour.',
      passes: 'Every text colour reaches WCAG AA (4.5:1) on both page backgrounds, in both themes.',
      gapsTitle: 'Known gaps',
      gapsIntro:
        'These pairs do not reach WCAG AA (4.5:1). Version 1.0.0 keeps every value exactly as the sites had it, so they are listed here instead of quietly changed.',
      gap: '{token} on {on}, {theme} theme: {ratio}'
    },
    syntax: {
      title: 'Syntax',
      path: '~/designkit/syntax.ts',
      intro: 'For anything that looks like code. Each colour has a class: .kw .str .num-t .fn .prop .com .punc.'
    },
    type: {
      title: 'Typography',
      path: '~/designkit/fonts.css',
      intro: 'Two fonts. Inter for reading, JetBrains Mono for everything that should feel like an editor.',
      role: 'Role',
      notes: 'Notes',
      sample: 'The quick brown fox',
      rows: {
        body: { role: 'Body text', notes: 'Inter Variable, 1rem, line-height 1.6, at most 70 characters per line' },
        mono: { role: 'Code-ish UI', notes: 'JetBrains Mono Variable: nav links, buttons, tags, section titles, labels' },
        h1: { role: 'h1', notes: 'Inter 700, large and tight: letter-spacing -0.04em, line-height about 0.95' },
        h2: { role: 'h2', notes: 'Mono 700, written as a tag, with < and /> in --accent-text' },
        h3: { role: 'h3', notes: 'Inter 700, 1.15rem' }
      },
      fonts: 'Both fonts are self-hosted through @fontsource-variable. No Google Fonts, so no visitor IP goes to a third party.'
    },
    shape: {
      title: 'Shape',
      path: '~/designkit/shape.css',
      intro: 'Sizes, radii and widths. Borders are always 1px of --border.',
      rule: 'Token or rule',
      value: 'Value',
      rows: {
        navH: { rule: '--nav-h', value: '60px: header height; scroll-padding-top is 60 + 8px' },
        container: { rule: '.container', value: 'min(1100px, 100% - 2rem): content width, 1rem gutter each side' },
        header: { rule: 'Header width', value: 'min(1360px, 100% - 2rem)' },
        section: { rule: '.section', value: 'clamp(2.75rem, 6vw, 4.5rem) of padding, top and bottom' },
        radius: { rule: '--radius', value: '14px: cards, dropdowns' },
        radiusSm: { rule: '--radius-sm', value: '9px: buttons, icon buttons, inputs' },
        tag: { rule: 'Tags', value: '6px radius' },
        pill: { rule: 'Pills', value: '999px: language switch, badges' },
        icon: { rule: 'Icon buttons', value: '36 × 36px, 1px border, --surface' }
      }
    },
    motion: {
      title: 'Motion',
      path: '~/designkit/motion.css',
      intro: 'Two easings. Press play to see them next to each other.',
      play: 'Play',
      ease: 'Default for everything',
      spring: 'Small playful overshoots: the logo brackets',
      rules: [
        'Hover transitions take 0.2 to 0.35s. Entrances take 0.7 to 0.9s: fade, an 18px rise and a blur.',
        'Buttons press down to scale(0.96), icon buttons to scale(0.92).',
        'Nothing follows the cursor. Buttons stay where they are. A gentle tilt on a large card is fine.',
        'prefers-reduced-motion switches all animation off. Anything you add has to respect it too.'
      ]
    }
  },
  components: {
    title: 'Components',
    description:
      'The classes of the joeyoosenbrug.nl design kit, live: buttons, tags, frosted cards, the caret, focus ring and syntax colours, each with markup to copy.',
    intro: 'The classes in kit.css. Each preview is rendered from the exact markup printed below it.',
    path: '~/designkit/kit.css',
    listTitle: 'Classes',
    items: {
      btn: 'Mono, 0.9rem, 600, a surface with a border. On hover: a lighter surface, a teal border and a glow. Works on links and buttons.',
      btnPrimary: 'Teal fill with --accent-ink text and a light sweep on hover. One per view.',
      tag: 'A small mono chip, muted, teal on hover.',
      glass: 'The frosted card: surface, border, 14px radius, blur and shadow. Translucent, so the backdrop shows through.',
      ring: 'The same card with a rotating teal to purple border on hover and focus. For cards you can click.',
      caret: 'A blinking block cursor. It is decoration, so hide it from screen readers.',
      syntax: 'The syntax colours as classes, for anything that looks like code.',
      mono: 'Switches to JetBrains Mono. For file paths, labels and meta.',
      focus: 'Every focusable element gets a 2px --accent-text outline with a 3px offset. Never remove it.',
      skip: 'The "skip to content" link: the first thing in <body>, pointing at #main. It slides in when it gets focus.',
      srOnly: 'Visually hidden, still read by screen readers. Here it tells that the link opens a new tab.',
      reveal: 'Reveal on scroll. Put .js on <html>, .reveal on the element, and add .in once it is in view.'
    },
    trySkip: 'Show the skip link of this page',
    layoutTitle: 'Layout',
    layoutPath: '~/designkit/layout.html',
    layoutIntro:
      'This page is built with the same three classes: .section for the vertical rhythm, .container for the width, .section-head for a title with its intro.',
    blurTitle: 'Blur',
    blurPath: '~/designkit/blur.css',
    blurIntro:
      'Always write -webkit-backdrop-filter before backdrop-filter. Lightning CSS, used by Vite 8 and Tailwind 4, merges the two and keeps the last one. If that is the prefixed one, Chrome shows no blur.'
  },
  header: {
    title: 'Header',
    description:
      'The shared header of every joeyoosenbrug.nl site: a live playground, what it does, and how to use it in Svelte, React, Angular and plain HTML.',
    intro: 'The same header on every site. An app decides its links and languages; everything else is fixed.',
    path: '~/designkit/header.ts',
    play: {
      title: 'Playground',
      path: '~/designkit/header.preview',
      intro:
        'A real page in a frame, with the real header. Change its width to see the menu fold at 1120px, scroll inside it to see the bar and the frosted state.',
      width: 'Width',
      links: 'Links',
      search: 'Ctrl K button',
      frame: 'Preview of the header',
      mobile: 'Phone',
      tablet: 'Tablet',
      desktop: 'Desktop'
    },
    preview: {
      title: 'Header preview',
      links: ['Skills', 'Career', 'Projects', 'Contact'],
      body: 'Scroll to see the progress bar and the frosted background. The link of the section in view is marked.',
      searched: 'Command menu opened'
    },
    changes: {
      title: 'PerApp',
      path: '~/designkit/header.props',
      intro: 'What changes per app, and nothing else:',
      items: [
        'The links, numbered 01., 02., … in order.',
        'Which link is current.',
        'The language links: the same page in English and Dutch.',
        'The language of the labels.',
        'Whether the Ctrl K button shows: only when the app has a command menu.'
      ],
      sameIntro: 'What stays exactly the same:',
      same: 'The <JO/> logo linking to joeyoosenbrug.nl, the height of 60px, the maximum width of 1360px, the pill language switch, the theme button, the burger below 1120px, the gradient progress bar, the frosted background once scrolled, every colour, size and animation.'
    },
    behaviour: {
      title: 'Behaviour',
      path: '~/designkit/header.js',
      intro: 'One script, header.js, does all of it for every framework.',
      feature: 'Feature',
      how: 'How it works',
      rows: {
        progress: { feature: 'Progress bar', how: 'A 2px teal to purple gradient along the bottom edge, scaled to the scroll position.' },
        frosted: { feature: 'Frosted state', how: 'After 12px of scroll: --bg at 78%, blur(16px) and a bottom border.' },
        active: { feature: 'Active link', how: 'aria-current on the link. Links to #sections on the same page are tracked while scrolling.' },
        menu: { feature: 'Mobile menu', how: 'Below 1120px the links move into a dropdown card. It closes on a link click and on Escape.' },
        numbers: { feature: 'Number prefixes', how: '01. shows above 1480px and in the mobile menu. In between it is hidden to save room.' },
        theme: {
          feature: 'Theme',
          how: 'A sun in dark mode, a moon in light mode. Saved in a jo-theme cookie on .joeyoosenbrug.nl, shared by every subdomain, plus localStorage.'
        },
        search: { feature: 'Ctrl K', how: 'Hidden unless onSearch is passed. Then the button shows and Ctrl/Cmd+K calls it.' }
      }
    },
    usage: {
      title: 'Usage',
      path: '~/designkit/header.usage',
      intro: 'The same header in four forms. Pick yours.',
      sveltekit:
        'A wrapper of about fifteen lines hands your app’s state to the kit’s header. Wrap it in {#key page.url.pathname} if the links or labels change between pages.',
      next: 'A client component, because it reads the current path.',
      angular:
        'Angular gets a component you own instead of one from the package: publishing an Angular library needs a second build chain for a single app. Copy the component below into src/app/jo/. Its imports already point at the package.',
      html: 'Copy the markup from header.html, then start it once.',
      angularFile: 'The whole component',
      htmlFile: 'The markup'
    },
    props: {
      title: 'Props',
      path: '~/designkit/header.d.ts',
      intro: 'The Svelte and React headers take the same props.',
      prop: 'Prop',
      type: 'Type',
      notes: 'Notes',
      rows: {
        links: 'Leave it empty and the menu and burger are not rendered.',
        languages: 'The same page in each language, not the home page.',
        labels: 'headerLabels.en or headerLabels.nl from the package.',
        homeHref: 'Where the logo goes. The portfolio, unless you have a very good reason.',
        onSearch: 'Shows the Ctrl K button and binds Ctrl/Cmd+K.',
        onLanguage: 'Svelte only. Called with the language code on a click, for remembering the choice.',
        skip: 'Svelte only, on by default. Renders the "skip to content" link before the header.',
        tools: 'The app’s own controls, such as a sign-in button, placed before the language switch. In React: children.'
      },
      menuTitle: 'A command menu'
    }
  },
  guidelines: {
    title: 'Guidelines',
    description:
      'How a joeyoosenbrug.nl site is designed and built: the backdrop, the interface decisions, the code conventions, and a checklist for a new subdomain.',
    intro: 'The decisions behind the design, and the conventions the code follows. Not law, but every site so far keeps to them.',
    path: '~/designkit/README.md',
    backdrop: {
      title: 'Backdrop',
      path: '~/designkit/backdrop.css',
      intro: 'Every page has the same background, drawn by body::before in kit.css. You are looking at it now.',
      items: [
        'A purple glow top right: --accent-2 at 13%, an ellipse of 1100 × 650px.',
        'A teal glow on the left: --accent at 9%, 900 × 600px.',
        'A 48px grid of 1px lines in --grid-line.'
      ],
      note: 'It is fixed behind everything, so content scrolls over it. Do not give a full-page container its own background, or the grid disappears. Cards are translucent, so the backdrop shows through.'
    },
    ui: {
      title: 'Interface',
      path: '~/designkit/decisions.md',
      intro: 'What makes a page feel like it belongs.',
      items: {
        editor: {
          title: 'It looks like a developer’s editor',
          text: 'File-path labels, window chrome with three dots, // comments for hints, section titles written as tags, a terminal prompt. Use it as seasoning, not on every element.'
        },
        playful: {
          title: 'Playful but clear',
          text: 'Microcopy can joke, but every control says what it does. If something is not obvious, it is not playful, it is unclear.'
        },
        dark: { title: 'Dark by default', text: 'Light is an equal option. Test every screen in both.' },
        languages: {
          title: 'Two languages',
          text: 'English at / and Dutch at /nl/, or /en/ and /nl/ for apps with locale routing. The same pages, the same structure, and the switch keeps you on the same page. Write the Dutch yourself.'
        },
        fits: {
          title: 'The first screen fits',
          text: 'The hero and anything meant to be seen at a glance fit from 1366 × 657 up to 2560 × 1300 without scrolling.'
        },
        external: {
          title: 'External links',
          text: 'They open in a new tab with rel="noopener noreferrer" and end with ↗. The <JO/> logo always goes back to the portfolio.'
        },
        privacy: { title: 'Privacy', text: 'No cookies except the theme cookie, cookie-less analytics, self-hosted fonts, no contact forms.' },
        accessible: {
          title: 'Accessible',
          text: 'WCAG 2.2 AA: contrast through the -text tokens, a skip link, visible focus, aria-current on the active page, labelled icon buttons, <html lang> per language, reduced motion respected.'
        }
      }
    },
    code: {
      title: 'Code',
      path: '~/designkit/conventions.md',
      intro: 'The same habits in every repository.',
      items: {
        typescript: { title: 'TypeScript', text: 'Everywhere, strict. Plain data and small functions before classes.' },
        formatting: {
          title: 'Formatting and linting',
          text: 'Prettier with single quotes, no trailing commas and 160 columns. ESLint with the recommended TypeScript rules and the framework’s plugin. Unused variables are errors unless they start with _.'
        },
        content: {
          title: 'Content lives in data files',
          text: 'Text per language in locales/en and locales/nl. The Dutch file is type-checked against the English one, and a unit test checks that both have the same keys.'
        },
        styles: {
          title: 'Styles',
          text: 'Tokens only: no hard-coded colours or font stacks. Component styles are scoped. Shared classes come from the kit.'
        },
        comments: { title: 'Comments', text: 'They explain why, not what, and they are short.' },
        tests: {
          title: 'Tests on every pull request',
          text: 'Type check, lint, unit tests, end-to-end and accessibility tests on desktop and mobile in both themes, Lighthouse budgets. Nothing merges with a red check.'
        },
        workflow: { title: 'Workflow', text: 'Feature branch, pull request into main, checks, merge, automatic deploy. Nobody pushes to main directly.' },
        commits: { title: 'Commits', text: 'An imperative subject, a body that explains why when it is not obvious, one author.' }
      }
    },
    checklist: {
      title: 'Checklist',
      path: '~/designkit/new-subdomain.md',
      intro: 'For a new subdomain.',
      items: [
        'The package and both fonts are installed; kit.css and header.css are loaded.',
        'The theme script is in <head> before the CSS, and <meta name="theme-color"> is #0a0e17.',
        'The order in <body> is: skip link, header, <main id="main">.',
        'Header links, language links and labels are filled in; <JO/> goes to joeyoosenbrug.nl.',
        'English and Dutch both exist, with <html lang> set per language.',
        'Checked in dark and light, at 390px and 1440px wide, with the keyboard only.',
        'Added to the side projects of the portfolio, so it shows in the hero and under Projects.'
      ]
    }
  },
  changelog: {
    title: 'Changelog',
    description: 'What changed in each version of @joeykwispel/design-kit.',
    intro: 'What changed in each version of the package. Renaming or removing a token or class is a major release; a new one is a minor release.',
    path: '~/designkit/CHANGELOG.md',
    english: 'The changelog is written in English only.'
  },
  footer: {
    madeBy: 'Made by',
    source: 'Source',
    newTab: '(opens in a new tab)'
  },
  error: {
    notFound: 'page not found',
    line: 'This page does not exist (yet), or it got refactored away.',
    home: 'back to the kit'
  }
};
