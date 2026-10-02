<script lang="ts">
  import { onMount } from 'svelte';
  import { initJoHeader } from '../header.js';
  import type { HeaderLabels, HeaderLanguage, HeaderLink } from '../header.js';

  /**
   * The joeyoosenbrug.nl header as a Svelte 5 component. Same markup as header.html, same behaviour through header.js.
   * Only the props change per app. Put kit.css and header.css from the package in your global styles.
   *
   * Wrap it in {#key page.url.pathname} when links or labels change between pages, so header.js starts again with them.
   */
  interface Props {
    /** Leave empty for an app with a single page: the menu and its burger are not rendered. */
    links?: HeaderLink[];
    languages: HeaderLanguage[];
    labels: HeaderLabels;
    /** Where the <JO/> logo goes. Always the portfolio unless you have a very good reason. */
    homeHref?: string;
    /** Shows the Ctrl K button and binds Ctrl/Cmd+K. Leave out when the app has no command menu. */
    onSearch?: () => void;
    /** Called with the language code when a language link is clicked, e.g. to remember the choice. */
    onLanguage?: (code: string) => void;
    /** Renders the "skip to content" link (to #main) before the header. Needs `labels.skip`. */
    skip?: boolean;
  }

  let { links = [], languages, labels, homeHref = 'https://joeyoosenbrug.nl/', onSearch, onLanguage, skip = true }: Props = $props();
  let root: HTMLElement;

  onMount(() => initJoHeader(root, onSearch ? { onSearch: () => onSearch?.() } : {}));
</script>

{#if skip && labels.skip}
  <a class="skip" href="#main">{labels.skip}</a>
{/if}

<header class="jo-nav" bind:this={root}>
  <div class="jo-nav__progress" aria-hidden="true"></div>
  <div class="jo-nav__bar">
    <a class="jo-nav__logo" href={homeHref} aria-label={labels.home}><span class="jo-nav__br">&lt;</span>JO<span class="jo-nav__br">/&gt;</span></a>

    {#if links.length}
      <nav class="jo-nav__menu" aria-label={labels.main}>
        <ul>
          {#each links as link, i (link.href)}
            <li>
              <a class="jo-nav__link" href={link.href} aria-current={link.current ? 'page' : undefined}
                ><span class="jo-nav__idx">{String(i + 1).padStart(2, '0')}.</span>{link.label}</a
              >
            </li>
          {/each}
        </ul>
      </nav>
    {/if}

    <div class="jo-nav__tools">
      <button type="button" class="jo-nav__search" aria-label={labels.search} aria-keyshortcuts="Control+K Meta+K" hidden={!onSearch}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <kbd>Ctrl K</kbd>
      </button>

      <div class="jo-nav__lang" role="group" aria-label={labels.language}>
        {#each languages as language (language.code)}
          <a
            href={language.href}
            hreflang={language.code}
            aria-current={language.current ? 'true' : undefined}
            onclick={() => onLanguage?.(language.code)}
            data-sveltekit-noscroll>{language.code.toUpperCase()}</a
          >
        {/each}
      </div>

      <button type="button" class="jo-nav__icon jo-nav__theme" aria-label={labels.toLight} data-label-dark={labels.toLight} data-label-light={labels.toDark}>
        <svg
          class="jo-nav__sun"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
        <svg
          class="jo-nav__moon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      </button>

      {#if links.length}
        <button type="button" class="jo-nav__icon jo-nav__burger" aria-expanded="false" aria-label={labels.menu}>
          <svg
            class="jo-nav__open"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            class="jo-nav__close"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      {/if}
    </div>
  </div>
</header>
