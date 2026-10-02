<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import { reveal } from '$lib/utils/actions';
  import PageHead from '$lib/components/PageHead.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';

  const c = $derived(t(app.locale));
  const k = $derived(c.guidelines);

  const uiKeys = ['editor', 'playful', 'dark', 'languages', 'fits', 'external', 'privacy', 'accessible'] as const;
  const codeKeys = ['typescript', 'formatting', 'content', 'styles', 'comments', 'tests', 'workflow', 'commits'] as const;
</script>

<PageHead title={k.title} description={k.description} intro={k.intro} path="/guidelines/" file={k.path} />

<section class="section" id="backdrop">
  <div class="container">
    <SectionHead title={k.backdrop.title} path={k.backdrop.path} intro={k.backdrop.intro} />
    <ul class="rules" use:reveal>
      {#each k.backdrop.items as item (item)}<li>{item}</li>{/each}
    </ul>
    <p class="note sub" use:reveal>{k.backdrop.note}</p>
  </div>
</section>

<section class="section" id="interface">
  <div class="container">
    <SectionHead title={k.ui.title} path={k.ui.path} intro={k.ui.intro} />
    <ul class="cards">
      {#each uiKeys as key, i (key)}
        <li class="glass" use:reveal={{ delay: (i % 2) * 60 }}>
          <h3>{k.ui.items[key].title}</h3>
          <p>{k.ui.items[key].text}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section" id="code">
  <div class="container">
    <SectionHead title={k.code.title} path={k.code.path} intro={k.code.intro} />
    <ul class="cards">
      {#each codeKeys as key, i (key)}
        <li class="glass" use:reveal={{ delay: (i % 2) * 60 }}>
          <h3>{k.code.items[key].title}</h3>
          <p>{k.code.items[key].text}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section" id="checklist">
  <div class="container">
    <SectionHead title={k.checklist.title} path={k.checklist.path} intro={k.checklist.intro} />
    <ol class="checklist glass" use:reveal>
      {#each k.checklist.items as item (item)}
        <li><span class="box mono" aria-hidden="true">[ ]</span>{item}</li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
    gap: 0.9rem;
  }
  .cards li {
    padding: 1.1rem 1.2rem;
    display: grid;
    gap: 0.4rem;
    align-content: start;
  }
  .cards p {
    color: var(--muted);
    font-size: 0.93rem;
  }
  .checklist {
    margin: 0;
    padding: 1.1rem 1.3rem;
    list-style: none;
    display: grid;
    gap: 0.7rem;
  }
  .checklist li {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.8rem;
  }
  .box {
    color: var(--accent-text);
    font-size: 0.85rem;
    line-height: 1.9;
  }
</style>
