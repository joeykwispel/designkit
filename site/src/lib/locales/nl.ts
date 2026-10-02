import type { Content } from './index';

/** Alle tekst van de site in het Nederlands. Dezelfde vorm als en.ts. */
const nl: Content = {
  meta: {
    title: 'Design kit | het designsysteem van joeyoosenbrug.nl',
    description:
      'Het designsysteem achter joeyoosenbrug.nl en de subdomeinen: kleuren, typografie, componenten en de gedeelde header, als één npm-pakket. Live te zien, in het Nederlands en Engels.',
    imageAlt: 'Design kit: het designsysteem van joeyoosenbrug.nl',
    suffix: 'Design kit'
  },
  nav: {
    home: 'Start',
    tokens: 'Tokens',
    components: 'Componenten',
    header: 'Header',
    guidelines: 'Richtlijnen',
    changelog: 'Changelog'
  },
  ui: {
    copy: 'kopieer',
    copied: 'gekopieerd',
    preview: 'voorbeeld',
    stack: 'Kies je stack',
    dark: 'Donker',
    light: 'Licht',
    scroll: 'scrolt opzij'
  },
  home: {
    title: 'Eén design kit,',
    titleAccent: 'elk subdomein.',
    lead: 'De kleuren, typografie, componenten en header van joeyoosenbrug.nl als één npm-pakket. Elke app installeert het, dus ze zien er allemaal hetzelfde uit en werken hetzelfde. Deze site is er ook mee gebouwd.',
    start: 'Aan de slag',
    source: 'Broncode op GitHub',
    newTab: '(opent in een nieuw tabblad)',
    installTitle: 'Installeren',
    installIntro:
      'Eén pakket, plus de twee lettertypen waar het omheen ontworpen is. De lettertypen staan op de eigen server, dus geen bezoeker wordt naar Google gestuurd.',
    quickTitle: 'SnelStarten',
    quickIntro: 'Van een lege app naar de juiste kleuren, lettertypen en header. Kies de stack waar je mee werkt.',
    exportsTitle: 'Inhoud',
    exportsIntro: 'Elk onderdeel is een eigen import, dus een app neemt alleen wat hij gebruikt.',
    exports: {
      kit: 'Tokens voor beide thema’s, basisstijlen, de achtergrond, knoppen, tags en kaarten.',
      headerCss: 'De stijlen van de header. Klassen beginnen met jo-nav, dus er botst niets.',
      header: 'Wat de header doet: scrollbalk, mobiel menu, themaknop, Ctrl K.',
      svelte: 'De header als Svelte 5-component.',
      react: 'De header als React-component, voor Next.js en verwanten.',
      html: 'De header als gewone HTML, voor al het andere.',
      tokens: 'Elke tokenwaarde als getypeerde JavaScript, voor canvas en gegenereerde afbeeldingen.',
      tailwind: 'De tokens als themavariabelen voor Tailwind 4: bg-bg, text-muted, font-mono.',
      themeScript: 'Het script dat het thema zet vóór de eerste paint, met de bijbehorende CSP-hash.'
    },
    sitesTitle: 'Sites',
    sitesIntro: 'De sites waar dit ontwerp voor gemaakt is. Ze delen één thema: zet er één op licht en de rest volgt.',
    sites: {
      portfolio: 'Waar het ontwerp vandaan komt. Alles hier begon als de stylesheet van deze site.',
      arcade: 'Kleine browsergames, elk in een andere programmeertaal.',
      tools: 'Developertools die in je browser draaien.',
      codeguessr: 'Raad de programmeertaal aan de hand van een stukje code.',
      devcity: 'Mijn skills als een 3D-stad bij nacht.'
    }
  },
  quickstart: {
    sveltekit: [
      'Installeer de kit en de lettertypen.',
      'Laad de lettertypen en de twee stylesheets één keer, in de root-layout.',
      'Schrijf een kleine eigen header die jouw links en talen doorgeeft aan de header van de kit.',
      'Zet het thema vóór de eerste paint. app.html is een statisch bestand, dus een server-hook vult het script in.'
    ],
    next: [
      'Installeer de kit en de lettertypen.',
      'Importeer de kit na Tailwind. tailwind.css maakt utilities van de tokens.',
      'Laad de lettertypen, zet het thema vóór de eerste paint en toon de header in de layout.',
      'De header moet het huidige pad weten, dus die staat in een kleine client-component.'
    ],
    angular: [
      'Installeer de kit en de lettertypen.',
      'Importeer alles in de globale stylesheet.',
      'Plak het themascript in <head>, vóór alle CSS. index.html kan het niet importeren; dit is precies het script dat het pakket exporteert.',
      'Kopieer de header-component van de Header-pagina naar src/app/jo/ en gebruik hem in de root-component.'
    ],
    html: [
      'Installeer de kit en kopieer de drie bestanden die je nodig hebt naast je pagina.',
      'Eerst het themascript, dan de stylesheets, dan de HTML van de header, en dan start je hem.'
    ]
  },
  tokens: {
    title: 'Tokens',
    description: 'Elke kleur, elk lettertype, elke maat en easing van joeyoosenbrug.nl, in beide thema’s, met contrastwaarden. Rechtstreeks uit het pakket.',
    intro:
      'Elke waarde op deze pagina komt uit het pakket, dus wat je ziet is wat je installeert. Zet nooit een kleur vast in een component: gebruik het token, dan blijven beide thema’s werken.',
    colors: {
      title: 'Kleuren',
      path: '~/designkit/tokens.ts',
      intro:
        'Twee thema’s, te wisselen met data-theme op <html>. Donker is de standaard. Het getal naast een tekstkleur is het contrast op de pagina-achtergrond van dat thema.',
      token: 'Token',
      use: 'Gebruik',
      uses: {
        bg: 'Pagina-achtergrond, ook <meta name="theme-color">',
        'bg-2': 'Dichte panelen boven de pagina: dropdowns, popovers',
        surface: 'Kaarten, knoppen, invoervelden',
        'surface-2': 'Hover van een surface',
        border: 'Alle randen van 1px',
        text: 'Lopende tekst, koppen',
        muted: 'Secundaire tekst, inactieve links, meta',
        accent: 'Het teal van het merk: primaire knop, actieve pil, caret, balken',
        'accent-text': 'Teal als tekst: links, nummers',
        'accent-ink': 'Tekst op een teal achtergrond',
        'accent-2': 'Tweede merkkleur, paars: verlopen, accenten',
        'accent-2-text': 'Paars als tekst: badges, "concept"',
        glow: 'De ring van 4px bij hover: box-shadow: 0 0 0 4px var(--glow)',
        shadow: 'Kaarten en dropdowns',
        'chip-l': 'Lichtheid van een gekleurde chip, voor hsl() met je eigen tint',
        'chip-bg-a': 'Dekking van de achtergrond van die chip',
        'grid-line': 'Het vage raster op de achtergrond'
      },
      gradient: 'Verlopen lopen altijd van teal naar paars, van links naar rechts.',
      mixing: 'Meng voor een getinte rand of een zachte vulling het accent, in plaats van een kleur te verzinnen.',
      passes: 'Elke tekstkleur haalt WCAG AA (4,5:1) op beide pagina-achtergronden, in beide thema’s.',
      gapsTitle: 'Bekende gaten',
      gapsIntro:
        'Deze combinaties halen WCAG AA (4,5:1) niet. Versie 1.0.0 houdt elke waarde precies zoals de sites hem hadden, dus ze staan hier in plaats van dat ze stilletjes zijn aangepast.',
      gap: '{token} op {on}, thema {theme}: {ratio}'
    },
    syntax: {
      title: 'Syntax',
      path: '~/designkit/syntax.ts',
      intro: 'Voor alles wat op code lijkt. Elke kleur heeft een klasse: .kw .str .num-t .fn .prop .com .punc.'
    },
    type: {
      title: 'Typografie',
      path: '~/designkit/fonts.css',
      intro: 'Twee lettertypen. Inter om te lezen, JetBrains Mono voor alles wat als een editor moet voelen.',
      role: 'Rol',
      notes: 'Toelichting',
      sample: 'Pa’s wijze lynx bezag vroom',
      rows: {
        body: { role: 'Lopende tekst', notes: 'Inter Variable, 1rem, regelhoogte 1,6, hooguit 70 tekens per regel' },
        mono: { role: 'Code-achtige UI', notes: 'JetBrains Mono Variable: navigatielinks, knoppen, tags, sectietitels, labels' },
        h1: { role: 'h1', notes: 'Inter 700, groot en strak: letter-spacing -0.04em, regelhoogte rond 0,95' },
        h2: { role: 'h2', notes: 'Mono 700, geschreven als een tag, met < en /> in --accent-text' },
        h3: { role: 'h3', notes: 'Inter 700, 1.15rem' }
      },
      fonts:
        'Beide lettertypen staan op de eigen server via @fontsource-variable. Geen Google Fonts, dus geen IP-adres van een bezoeker gaat naar een derde partij.'
    },
    shape: {
      title: 'Vorm',
      path: '~/designkit/shape.css',
      intro: 'Maten, afrondingen en breedtes. Randen zijn altijd 1px in --border.',
      rule: 'Token of regel',
      value: 'Waarde',
      rows: {
        navH: { rule: '--nav-h', value: '60px: hoogte van de header; scroll-padding-top is 60 + 8px' },
        container: { rule: '.container', value: 'min(1100px, 100% - 2rem): breedte van de inhoud, 1rem marge aan elke kant' },
        header: { rule: 'Breedte van de header', value: 'min(1360px, 100% - 2rem)' },
        section: { rule: '.section', value: 'clamp(2.75rem, 6vw, 4.5rem) aan padding, boven en onder' },
        radius: { rule: '--radius', value: '14px: kaarten, dropdowns' },
        radiusSm: { rule: '--radius-sm', value: '9px: knoppen, icoonknoppen, invoervelden' },
        tag: { rule: 'Tags', value: 'afronding van 6px' },
        pill: { rule: 'Pillen', value: '999px: taalwissel, badges' },
        icon: { rule: 'Icoonknoppen', value: '36 × 36px, rand van 1px, --surface' }
      }
    },
    motion: {
      title: 'Beweging',
      path: '~/designkit/motion.css',
      intro: 'Twee easings. Druk op afspelen om ze naast elkaar te zien.',
      play: 'Afspelen',
      ease: 'Standaard voor alles',
      spring: 'Kleine speelse uitschieters: de haakjes van het logo',
      rules: [
        'Hover-overgangen duren 0,2 tot 0,35s. Binnenkomers duren 0,7 tot 0,9s: vervagen, 18px omhoog en een blur.',
        'Knoppen drukken in tot scale(0.96), icoonknoppen tot scale(0.92).',
        'Niets volgt de cursor. Knoppen blijven waar ze staan. Een lichte kanteling van een grote kaart mag.',
        'prefers-reduced-motion zet alle animatie uit. Alles wat je toevoegt moet daar ook naar luisteren.'
      ]
    }
  },
  components: {
    title: 'Componenten',
    description:
      'De klassen van de design kit van joeyoosenbrug.nl, live: knoppen, tags, matglazen kaarten, de caret, de focusring en syntaxkleuren, elk met HTML om te kopiëren.',
    intro: 'De klassen in kit.css. Elk voorbeeld wordt getekend met precies de HTML die eronder staat.',
    path: '~/designkit/kit.css',
    listTitle: 'Klassen',
    items: {
      btn: 'Mono, 0.9rem, 600, een surface met een rand. Bij hover: een lichtere surface, een teal rand en een gloed. Werkt op links en knoppen.',
      btnPrimary: 'Teal gevuld, met tekst in --accent-ink en een lichtveeg bij hover. Eén per scherm.',
      tag: 'Een kleine mono chip, gedempt, teal bij hover.',
      glass: 'De matglazen kaart: surface, rand, afronding van 14px, blur en schaduw. Doorschijnend, dus de achtergrond blijft zichtbaar.',
      ring: 'Dezelfde kaart met een draaiende rand van teal naar paars bij hover en focus. Voor kaarten waar je op kunt klikken.',
      caret: 'Een knipperende blokcursor. Het is decoratie, dus verberg hem voor schermlezers.',
      syntax: 'De syntaxkleuren als klassen, voor alles wat op code lijkt.',
      mono: 'Schakelt naar JetBrains Mono. Voor bestandspaden, labels en meta.',
      focus: 'Elk focusbaar element krijgt een outline van 2px in --accent-text met 3px afstand. Haal hem nooit weg.',
      skip: 'De link "naar de inhoud": het eerste in <body>, gericht op #main. Hij schuift in beeld zodra hij focus krijgt.',
      srOnly: 'Onzichtbaar, maar wel voorgelezen door schermlezers. Hier vertelt hij dat de link een nieuw tabblad opent.',
      reveal: 'Verschijnen bij scrollen. Zet .js op <html>, .reveal op het element, en voeg .in toe zodra het in beeld is.'
    },
    trySkip: 'Toon de skip-link van deze pagina',
    layoutTitle: 'Layout',
    layoutPath: '~/designkit/layout.html',
    layoutIntro:
      'Deze pagina is opgebouwd met dezelfde drie klassen: .section voor het verticale ritme, .container voor de breedte, .section-head voor een titel met inleiding.',
    blurTitle: 'Blur',
    blurPath: '~/designkit/blur.css',
    blurIntro:
      'Schrijf altijd -webkit-backdrop-filter vóór backdrop-filter. Lightning CSS, gebruikt door Vite 8 en Tailwind 4, voegt de twee samen en houdt de laatste over. Is dat die met prefix, dan toont Chrome geen blur.'
  },
  header: {
    title: 'Header',
    description:
      'De gedeelde header van elke joeyoosenbrug.nl-site: een live speeltuin, wat hij doet, en hoe je hem gebruikt in Svelte, React, Angular en gewone HTML.',
    intro: 'Dezelfde header op elke site. Een app bepaalt zijn links en talen; al het andere ligt vast.',
    path: '~/designkit/header.ts',
    play: {
      title: 'Speeltuin',
      path: '~/designkit/header.preview',
      intro:
        'Een echte pagina in een kader, met de echte header. Verander de breedte om het menu te zien inklappen bij 1120px, en scroll erin om de balk en het matglas te zien.',
      width: 'Breedte',
      links: 'Links',
      search: 'Ctrl K-knop',
      frame: 'Voorbeeld van de header',
      mobile: 'Telefoon',
      tablet: 'Tablet',
      desktop: 'Desktop'
    },
    preview: {
      title: 'Voorbeeld van de header',
      links: ['Skills', 'Loopbaan', 'Projecten', 'Contact'],
      body: 'Scroll om de voortgangsbalk en de matglazen achtergrond te zien. De link van de sectie in beeld wordt gemarkeerd.',
      searched: 'Commandomenu geopend'
    },
    changes: {
      title: 'PerApp',
      path: '~/designkit/header.props',
      intro: 'Wat per app verandert, en verder niets:',
      items: [
        'De links, op volgorde genummerd met 01., 02., …',
        'Welke link de huidige is.',
        'De taallinks: dezelfde pagina in het Engels en het Nederlands.',
        'De taal van de labels.',
        'Of de Ctrl K-knop zichtbaar is: alleen als de app een commandomenu heeft.'
      ],
      sameIntro: 'Wat precies hetzelfde blijft:',
      same: 'Het <JO/>-logo dat naar joeyoosenbrug.nl gaat, de hoogte van 60px, de maximale breedte van 1360px, de taalwissel als pil, de themaknop, de hamburger onder 1120px, de voortgangsbalk met verloop, de matglazen achtergrond na het scrollen, elke kleur, maat en animatie.'
    },
    behaviour: {
      title: 'Gedrag',
      path: '~/designkit/header.js',
      intro: 'Eén script, header.js, doet dit allemaal, voor elk framework.',
      feature: 'Onderdeel',
      how: 'Hoe het werkt',
      rows: {
        progress: { feature: 'Voortgangsbalk', how: 'Een verloop van 2px van teal naar paars langs de onderrand, geschaald naar de scrollpositie.' },
        frosted: { feature: 'Matglas', how: 'Na 12px scrollen: --bg op 78%, blur(16px) en een rand aan de onderkant.' },
        active: { feature: 'Actieve link', how: 'aria-current op de link. Links naar #secties op dezelfde pagina worden gevolgd tijdens het scrollen.' },
        menu: { feature: 'Mobiel menu', how: 'Onder 1120px gaan de links naar een uitklapkaart. Die sluit bij een klik op een link en met Escape.' },
        numbers: { feature: 'Nummers', how: '01. staat erbij boven 1480px en in het mobiele menu. Daartussen is het verborgen om ruimte te besparen.' },
        theme: {
          feature: 'Thema',
          how: 'Een zon in het donkere thema, een maan in het lichte. Opgeslagen in een jo-theme-cookie op .joeyoosenbrug.nl, gedeeld door elk subdomein, plus localStorage.'
        },
        search: { feature: 'Ctrl K', how: 'Verborgen tenzij je onSearch meegeeft. Dan verschijnt de knop en roept Ctrl/Cmd+K hem aan.' }
      }
    },
    usage: {
      title: 'Gebruik',
      path: '~/designkit/header.usage',
      intro: 'Dezelfde header in vier vormen. Kies de jouwe.',
      sveltekit:
        'Een wrapper van zo’n vijftien regels geeft de toestand van je app door aan de header van de kit. Zet hem in {#key page.url.pathname} als de links of labels per pagina verschillen.',
      next: 'Een client-component, omdat hij het huidige pad leest.',
      angular:
        'Angular krijgt een component die van jou is, in plaats van een uit het pakket: een Angular-library publiceren vraagt een tweede build-keten voor één app. Kopieer de component hieronder naar src/app/jo/. De imports wijzen al naar het pakket.',
      html: 'Kopieer de HTML uit header.html en start hem daarna één keer.',
      angularFile: 'De hele component',
      htmlFile: 'De HTML'
    },
    props: {
      title: 'Props',
      path: '~/designkit/header.d.ts',
      intro: 'De header voor Svelte en die voor React nemen dezelfde props.',
      prop: 'Prop',
      type: 'Type',
      notes: 'Toelichting',
      rows: {
        links: 'Laat hem leeg en het menu en de hamburger worden niet getekend.',
        languages: 'Dezelfde pagina in elke taal, niet de homepage.',
        labels: 'headerLabels.en of headerLabels.nl uit het pakket.',
        homeHref: 'Waar het logo naartoe gaat. Het portfolio, tenzij je een heel goede reden hebt.',
        onSearch: 'Toont de Ctrl K-knop en koppelt Ctrl/Cmd+K.',
        onLanguage: 'Alleen Svelte. Wordt bij een klik aangeroepen met de taalcode, om de keuze te onthouden.',
        skip: 'Alleen Svelte, standaard aan. Tekent de link "naar de inhoud" vóór de header.'
      },
      menuTitle: 'Een commandomenu'
    }
  },
  guidelines: {
    title: 'Richtlijnen',
    description:
      'Hoe een joeyoosenbrug.nl-site ontworpen en gebouwd is: de achtergrond, de keuzes in de interface, de afspraken in de code, en een checklist voor een nieuw subdomein.',
    intro: 'De keuzes achter het ontwerp, en de afspraken waar de code zich aan houdt. Geen wet, maar elke site tot nu toe volgt ze.',
    path: '~/designkit/README.md',
    backdrop: {
      title: 'Achtergrond',
      path: '~/designkit/backdrop.css',
      intro: 'Elke pagina heeft dezelfde achtergrond, getekend door body::before in kit.css. Je kijkt er nu naar.',
      items: [
        'Een paarse gloed rechtsboven: --accent-2 op 13%, een ellips van 1100 × 650px.',
        'Een teal gloed links: --accent op 9%, 900 × 600px.',
        'Een raster van 48px met lijnen van 1px in --grid-line.'
      ],
      note: 'Hij staat vast achter alles, dus de inhoud scrolt eroverheen. Geef een container die de hele pagina vult geen eigen achtergrond, anders verdwijnt het raster. Kaarten zijn doorschijnend, dus de achtergrond blijft zichtbaar.'
    },
    ui: {
      title: 'Interface',
      path: '~/designkit/decisions.md',
      intro: 'Waardoor een pagina voelt alsof hij erbij hoort.',
      items: {
        editor: {
          title: 'Het lijkt op de editor van een developer',
          text: 'Labels met bestandspaden, vensters met drie stipjes, // comments als hint, sectietitels geschreven als tags, een terminalprompt. Gebruik het als kruiden, niet op elk element.'
        },
        playful: {
          title: 'Speels maar duidelijk',
          text: 'Kleine teksten mogen een grap maken, maar elke knop zegt wat hij doet. Is iets niet vanzelfsprekend, dan is het niet speels maar onduidelijk.'
        },
        dark: { title: 'Standaard donker', text: 'Licht is een gelijkwaardige keuze. Test elk scherm in beide.' },
        languages: {
          title: 'Twee talen',
          text: 'Engels op / en Nederlands op /nl/, of /en/ en /nl/ voor apps met taalroutes. Dezelfde pagina’s, dezelfde opbouw, en de wissel houdt je op dezelfde pagina. Schrijf het Nederlands zelf.'
        },
        fits: {
          title: 'Het eerste scherm past',
          text: 'De hero en alles wat je in één oogopslag moet zien, past van 1366 × 657 tot 2560 × 1300 zonder scrollen.'
        },
        external: {
          title: 'Externe links',
          text: 'Ze openen in een nieuw tabblad met rel="noopener noreferrer" en eindigen op ↗. Het <JO/>-logo gaat altijd terug naar het portfolio.'
        },
        privacy: {
          title: 'Privacy',
          text: 'Geen cookies behalve de themacookie, analytics zonder cookies, lettertypen op de eigen server, geen contactformulieren.'
        },
        accessible: {
          title: 'Toegankelijk',
          text: 'WCAG 2.2 AA: contrast via de -text-tokens, een skip-link, zichtbare focus, aria-current op de actieve pagina, icoonknoppen met een label, <html lang> per taal, en rekening met verminderde beweging.'
        }
      }
    },
    code: {
      title: 'Code',
      path: '~/designkit/conventions.md',
      intro: 'Dezelfde gewoontes in elke repository.',
      items: {
        typescript: { title: 'TypeScript', text: 'Overal, strict. Liever gewone data en kleine functies dan klassen.' },
        formatting: {
          title: 'Opmaak en linting',
          text: 'Prettier met enkele aanhalingstekens, geen komma’s aan het eind en 160 kolommen. ESLint met de aanbevolen TypeScript-regels en de plugin van het framework. Ongebruikte variabelen zijn fouten, tenzij ze met _ beginnen.'
        },
        content: {
          title: 'Inhoud staat in databestanden',
          text: 'Tekst per taal in locales/en en locales/nl. Het Nederlandse bestand wordt op type gecontroleerd tegen het Engelse, en een unittest controleert dat beide dezelfde sleutels hebben.'
        },
        styles: {
          title: 'Stijlen',
          text: 'Alleen tokens: geen vaste kleuren of lettertypestapels. Stijlen van een component zijn scoped. Gedeelde klassen komen uit de kit.'
        },
        comments: { title: 'Comments', text: 'Ze leggen uit waarom, niet wat, en ze zijn kort.' },
        tests: {
          title: 'Tests bij elke pull request',
          text: 'Typecontrole, lint, unittests, end-to-end- en toegankelijkheidstests op desktop en mobiel in beide thema’s, Lighthouse-budgetten. Niets wordt gemerged met een rode check.'
        },
        workflow: {
          title: 'Werkwijze',
          text: 'Feature branch, pull request naar main, checks, merge, automatische deploy. Niemand pusht rechtstreeks naar main.'
        },
        commits: { title: 'Commits', text: 'Een onderwerp in de gebiedende wijs, een body die uitlegt waarom als dat niet vanzelf spreekt, één auteur.' }
      }
    },
    checklist: {
      title: 'Checklist',
      path: '~/designkit/new-subdomain.md',
      intro: 'Voor een nieuw subdomein.',
      items: [
        'Het pakket en beide lettertypen zijn geïnstalleerd; kit.css en header.css worden geladen.',
        'Het themascript staat in <head> vóór de CSS, en <meta name="theme-color"> is #0a0e17.',
        'De volgorde in <body> is: skip-link, header, <main id="main">.',
        'Links, taallinks en labels van de header zijn ingevuld; <JO/> gaat naar joeyoosenbrug.nl.',
        'Engels en Nederlands bestaan allebei, met <html lang> per taal.',
        'Bekeken in donker en licht, op 390px en 1440px breed, met alleen het toetsenbord.',
        'Toegevoegd aan de zijprojecten van het portfolio, zodat het in de hero en onder Projecten staat.'
      ]
    }
  },
  changelog: {
    title: 'Changelog',
    description: 'Wat er in elke versie van @joeykwispel/design-kit is veranderd.',
    intro:
      'Wat er in elke versie van het pakket is veranderd. Een token of klasse hernoemen of weghalen is een major release; een nieuwe is een minor release.',
    path: '~/designkit/CHANGELOG.md',
    english: 'De changelog wordt alleen in het Engels geschreven.'
  },
  footer: {
    madeBy: 'Gemaakt door',
    source: 'Broncode',
    newTab: '(opent in een nieuw tabblad)'
  },
  error: {
    notFound: 'pagina niet gevonden',
    line: 'Deze pagina bestaat (nog) niet, of is weggerefactord.',
    home: 'terug naar de kit'
  }
};

export default nl;
