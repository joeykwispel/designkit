import type { Content } from './index';

/** Alle tekst van de site in het Nederlands. Dezelfde vorm als en.ts. */
const nl: Content = {
  meta: {
    title: 'Design kit | het designsysteem van joeyoosenbrug.nl',
    description:
      'Het designsysteem achter joeyoosenbrug.nl en de subdomeinen: kleuren, typografie, componenten en de gedeelde header, als één npm-pakket. Live te zien, in het Nederlands en Engels.',
    imageAlt: 'Design kit: het designsysteem van joeyoosenbrug.nl'
  },
  ui: {
    copy: 'kopieer',
    copied: 'gekopieerd'
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
    }
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
