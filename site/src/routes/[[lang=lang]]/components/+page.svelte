<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import { blur, componentKeys, layout, samples } from '$lib/data/components';
  import { reveal } from '$lib/utils/actions';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';

  const c = $derived(t(app.locale));
  const k = $derived(c.components);

  /** The skip link is fixed above the page until it has focus, so the demo focuses the real one. */
  const showSkip = () => document.querySelector<HTMLAnchorElement>('a.skip')?.focus();
</script>

<PageHead title={k.title} description={k.description} intro={k.intro} path="/components/" file="~/designkit/components/" />

<section class="section" id="classes">
  <div class="container">
    <SectionHead title={k.listTitle} path={k.path} />
    <div class="list">
      {#each componentKeys as key (key)}
        {@const sample = samples[key]}
        <article class="item" id={key} use:reveal>
          <div class="about">
            <h3 class="mono">{sample.name}</h3>
            <p>{k.items[key]}</p>
          </div>
          <div class="stack-y">
            {#if sample.codeOnly}
              <div class="demo glass">
                <button type="button" class="btn" onclick={showSkip}>{k.trySkip}</button>
              </div>
            {:else}
              <!-- The preview is the sample's own markup: static strings from data/components.ts, never user input. -->
              <!-- eslint-disable-next-line svelte/no-at-html-tags -->
              <div class="demo glass" class:tall={key === 'ring' || key === 'glass' || key === 'reveal'}>{@html sample.html}</div>
            {/if}
            <CodeBlock code={sample.html} lang="html" file="{key}.html" />
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="section" id="layout">
  <div class="container">
    <SectionHead title={k.layoutTitle} path={k.layoutPath} intro={k.layoutIntro} />
    <div use:reveal><CodeBlock code={layout} lang="html" file="section.html" /></div>
  </div>
</section>

<section class="section" id="blur">
  <div class="container">
    <SectionHead title={k.blurTitle} path={k.blurPath} intro={k.blurIntro} />
    <div use:reveal><CodeBlock code={blur} lang="css" file="panel.css" /></div>
  </div>
</section>

<style>
  .list {
    display: grid;
    gap: 2.4rem;
  }
  .item {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
    gap: 1rem 2rem;
    align-items: start;
    scroll-margin-top: calc(var(--nav-h) + 1rem);
  }
  .about {
    display: grid;
    gap: 0.5rem;
  }
  .about h3 {
    font-size: 0.95rem;
    color: var(--accent-text);
    overflow-wrap: anywhere;
  }
  .about p {
    color: var(--muted);
    font-size: 0.95rem;
  }
  /* The stage a sample is shown on. Samples bring only the kit's own classes. */
  .demo {
    padding: 1.4rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.7rem;
    min-height: 5.5rem;
    background: transparent;
    box-shadow: none;
  }
  .demo.tall {
    display: block;
  }
  .demo :global(pre) {
    margin: 0;
    font-size: 0.85rem;
    white-space: pre-wrap;
  }
  @media (max-width: 760px) {
    .item {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
