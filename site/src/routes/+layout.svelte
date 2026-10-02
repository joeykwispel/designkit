<script lang="ts">
  // Self-hosted fonts (no requests to Google, so no visitor IPs shared with third parties)
  import '@fontsource-variable/inter';
  import '@fontsource-variable/jetbrains-mono';
  // The kit itself, straight from the package: this site is its first user.
  import '@joeykwispel/design-kit/kit.css';
  import '@joeykwispel/design-kit/header.css';
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { app } from '$lib/app.svelte';
  import { localeOf, stripLocale } from '$lib/i18n';
  import { t } from '$lib/locales';
  import { nav, PREVIEW_PATH } from '$lib/nav';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children } = $props();

  // Read the language from the URL during render as well, so the prerendered HTML is already in the right language.
  const sync = () => {
    app.locale = localeOf(page.url.pathname);
  };
  sync();
  $effect.pre(sync);

  $effect(() => {
    document.documentElement.lang = app.locale;
  });

  const path = $derived(stripLocale(page.url.pathname));
  /** The playground's preview page brings its own header, and nothing else of the site. */
  const bare = $derived(path === PREVIEW_PATH);
  const links = $derived(nav.map((n) => ({ label: t(app.locale).nav[n.key], href: app.href(n.path), current: n.path === path })));

  onMount(() => {
    // A theme switched in another tab, or inside the playground's frame, shows here too.
    const follow = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) document.documentElement.dataset.theme = e.newValue;
    };
    addEventListener('storage', follow);
    return () => removeEventListener('storage', follow);
  });
</script>

{#if bare}
  {@render children()}
{:else}
  <!-- Re-created per page and language, so header.js picks up the new links and labels. -->
  {#key page.url.pathname}
    <Header {links} />
  {/key}

  <main id="main">
    {@render children()}
  </main>

  <Footer />
{/if}
