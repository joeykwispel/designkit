<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import PageHead from '$lib/components/PageHead.svelte';

  let { data } = $props();
  const k = $derived(t(app.locale).changelog);
</script>

<PageHead title={k.title} description={k.description} intro={k.intro} path="/changelog/" file={k.path} />

<section class="section">
  <div class="container">
    {#if app.locale !== 'en'}<p class="note english mono"><span class="com">//</span> {k.english}</p>{/if}
    <!-- The package's own CHANGELOG.md, rendered at build time: a file of this repository, never user input. -->
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    <div class="log glass" lang="en">{@html data.html}</div>
  </div>
</section>

<style>
  .english {
    font-size: 0.82rem;
    margin-bottom: 1rem;
  }
  .log {
    padding: 0.4rem 1.5rem 1.5rem;
  }
  .log :global(h2) {
    margin-top: 1.4rem;
    font-size: 1.5rem;
    color: var(--accent-text);
  }
  .log :global(h3) {
    margin-top: 1.3rem;
    font-family: var(--mono);
    font-size: 0.8rem;
    color: var(--muted);
    text-transform: lowercase;
  }
  .log :global(h3)::before {
    content: '// ';
    color: var(--syn-com);
  }
  .log :global(p) {
    margin-top: 0.7rem;
    color: var(--muted);
    max-width: 75ch;
  }
  .log :global(ul) {
    margin-top: 0.6rem;
    display: grid;
    gap: 0.45rem;
    max-width: 80ch;
  }
  .log :global(li) {
    position: relative;
    padding-left: 1.3rem;
  }
  .log :global(li)::before {
    content: '+';
    position: absolute;
    left: 0;
    font-family: var(--mono);
    color: var(--syn-str);
  }
  .log :global(code) {
    font-family: var(--mono);
    font-size: 0.85em;
    color: var(--accent-text);
  }
</style>
