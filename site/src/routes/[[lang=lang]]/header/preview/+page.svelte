<script lang="ts">
  import { onMount } from 'svelte';
  import { Header, headerLabels } from '@joeykwispel/design-kit/svelte';
  import { page } from '$app/state';
  import { app } from '$lib/app.svelte';
  import { locales, t } from '$lib/locales';
  import { PREVIEW_PATH } from '$lib/nav';
  import Seo from '$lib/components/Seo.svelte';

  /**
   * The page inside the playground's frame: the kit's header on top of enough content to scroll.
   * The playground sets the options in the URL hash, e.g. #links=4&search=1, so they can change without a reload.
   */
  const c = $derived(t(app.locale));
  const p = $derived(c.header.preview);

  let count = $state(4);
  let search = $state(false);
  let searched = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  function read() {
    const options = new URLSearchParams(location.hash.slice(1));
    count = Math.min(Math.max(Number(options.get('links') ?? 4) || 0, 0), 4);
    search = options.get('search') === '1';
  }

  onMount(() => {
    read();
    addEventListener('hashchange', read);
    // The frame and the page around it are two documents: follow a theme switch made in the other one.
    const follow = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'dark' || e.newValue === 'light')) document.documentElement.dataset.theme = e.newValue;
    };
    addEventListener('storage', follow);
    return () => {
      removeEventListener('hashchange', read);
      removeEventListener('storage', follow);
    };
  });

  const sections = $derived(p.links.slice(0, count).map((label, i) => ({ label, id: `section-${i + 1}` })));
  const links = $derived(sections.map((s) => ({ label: s.label, href: `#${s.id}` })));
  const languages = $derived(locales.map((code) => ({ code, href: app.hrefFor(code, page.url.pathname) + page.url.hash, current: code === app.locale })));

  function onSearch() {
    searched = true;
    clearTimeout(timer);
    timer = setTimeout(() => (searched = false), 1800);
  }
</script>

<Seo title="{p.title} | {c.meta.suffix}" description={c.header.description} path={PREVIEW_PATH} imageAlt={c.meta.imageAlt} noindex />

<!-- Started again when the options change, the way an app would on a new page. -->
{#key `${count}-${search}-${app.locale}`}
  <Header {links} {languages} labels={headerLabels[app.locale]} onSearch={search ? onSearch : undefined} skip={false} />
{/key}

<main id="main" class="container">
  <h1 class="mono"><span class="br">&lt;</span>JO<span class="br">/&gt;</span></h1>
  <p class="lead">{p.body}</p>
  {#each sections as section (section.id)}
    <section id={section.id} class="glass block">
      <h2>{section.label}</h2>
      <div class="lines" aria-hidden="true"><i></i><i></i><i></i></div>
    </section>
  {/each}
  {#if !sections.length}
    <div class="glass block"><div class="lines" aria-hidden="true"><i></i><i></i><i></i></div></div>
    <div class="glass block"><div class="lines" aria-hidden="true"><i></i><i></i><i></i></div></div>
  {/if}
</main>

<p class="toast mono" role="status">{searched ? p.searched : ''}</p>

<style>
  main {
    padding-block: calc(var(--nav-h) + 2rem) 3rem;
    display: grid;
    gap: 1.2rem;
  }
  h1 {
    font-size: 2rem;
    letter-spacing: -0.04em;
  }
  .br {
    color: var(--accent-text);
  }
  .lead {
    color: var(--muted);
  }
  .block {
    padding: 1.4rem 1.5rem;
    min-height: 62vh;
    display: grid;
    gap: 1rem;
    align-content: start;
    scroll-margin-top: calc(var(--nav-h) + 1rem);
  }
  h2 {
    font-size: 1.3rem;
  }
  /* placeholder text */
  .lines {
    display: grid;
    gap: 0.6rem;
  }
  .lines i {
    height: 10px;
    border-radius: 999px;
    background: var(--surface-2);
  }
  .lines i:nth-child(2) {
    width: 82%;
  }
  .lines i:nth-child(3) {
    width: 55%;
  }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 1rem;
    translate: -50% 0;
    max-width: none;
    padding: 0.5rem 0.9rem;
    font-size: 0.8rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--bg-2);
    box-shadow: var(--shadow);
    color: var(--text);
  }
  .toast:empty {
    display: none;
  }
</style>
