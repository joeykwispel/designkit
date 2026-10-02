<script lang="ts">
  import { page } from '$app/state';
  import { Header, headerLabels } from '@joeykwispel/design-kit/svelte';
  import { app } from '$lib/app.svelte';
  import { locales } from '$lib/locales';
  import type { HeaderLink, Locale } from '$lib/types';

  /**
   * The kit's header, fed with this site's state: the links, the same page in the other language, and the labels.
   * This wrapper is all a SvelteKit app has to write itself.
   */
  let { links = [] }: { links?: HeaderLink[] } = $props();

  const languages = $derived(locales.map((code) => ({ code, href: app.hrefFor(code, page.url.pathname), current: code === app.locale })));
</script>

<Header {links} {languages} labels={headerLabels[app.locale]} onLanguage={(code) => app.rememberLocale(code as Locale)} />
