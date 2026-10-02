<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import { exportKeys, exportPaths, INSTALL, PACKAGE, REPO } from '$lib/data/kit';
  import { sites } from '$lib/data/sites';
  import { quickstart } from '$lib/data/stacks';
  import { reveal } from '$lib/utils/actions';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import StackTabs from '$lib/components/StackTabs.svelte';
  import Seo from '$lib/components/Seo.svelte';

  const c = $derived(t(app.locale));
  const h = $derived(c.home);
</script>

<Seo title={c.meta.title} description={c.meta.description} imageAlt={c.meta.imageAlt} />

<section class="hero">
  <div class="container">
    <p class="kicker mono">
      <span class="prop">joey@designkit</span>:<span class="dir">~</span>$ npm i {PACKAGE}<span class="caret" aria-hidden="true"></span>
    </p>
    <h1>{h.title} <span class="grad">{h.titleAccent}</span></h1>
    <p class="lead">{h.lead}</p>
    <div class="actions">
      <a class="btn btn-primary" href="#install"><span aria-hidden="true">&gt;</span> {h.start}</a>
      <a class="btn" href={REPO} target="_blank" rel="noopener noreferrer">{h.source} ↗<span class="sr-only"> {h.newTab}</span></a>
    </div>
  </div>
</section>

<section class="section" id="install">
  <div class="container">
    <SectionHead title={h.installTitle} path="~/designkit/install.sh" intro={h.installIntro} />
    <div use:reveal>
      <CodeBlock code={INSTALL} lang="sh" file="terminal" />
    </div>
  </div>
</section>

<section class="section" id="quick-start">
  <div class="container">
    <SectionHead title={h.quickTitle} path="~/designkit/quick-start.md" intro={h.quickIntro} />
    <StackTabs id="quick">
      {#snippet children(stack)}
        <ol class="steps">
          {#each quickstart[stack] as blocks, i (i)}
            <li>
              <p><span class="n mono" aria-hidden="true">{String(i + 1).padStart(2, '0')}.</span>{c.quickstart[stack][i]}</p>
              {#each blocks as block (block.file)}
                <CodeBlock {...block} />
              {/each}
            </li>
          {/each}
        </ol>
      {/snippet}
    </StackTabs>
  </div>
</section>

<section class="section" id="contents">
  <div class="container">
    <SectionHead title={h.exportsTitle} path="~/designkit/package.json" intro={h.exportsIntro} />
    <ul class="exports">
      {#each exportKeys as key, i (key)}
        <li class="glass" use:reveal={{ delay: i * 40 }}>
          <code class="mono"><span class="pkg">{PACKAGE}</span>{exportPaths[key]}</code>
          <p>{h.exports[key]}</p>
        </li>
      {/each}
    </ul>
  </div>
</section>

<section class="section" id="sites">
  <div class="container">
    <SectionHead title={h.sitesTitle} path="~/designkit/sites.ts" intro={h.sitesIntro} />
    <ul class="sites">
      {#each sites as site, i (site.key)}
        <li use:reveal={{ delay: i * 40 }}>
          <a class="glass ring" href={site.url} target="_blank" rel="noopener noreferrer">
            <span class="name">{site.name} ↗<span class="sr-only"> {h.newTab}</span></span>
            <span class="domain mono">{site.domain}</span>
            <span class="what">{h.sites[site.key]}</span>
            <span class="tag">{site.stack}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .hero {
    min-height: calc(100svh - var(--nav-h) - 5rem);
    display: grid;
    align-content: center;
    padding-block: 2rem;
  }
  .kicker {
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 1rem;
    overflow-wrap: anywhere;
  }
  .dir {
    color: var(--syn-fn);
  }
  h1 {
    font-size: clamp(2.4rem, 7vw, 4.6rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    animation: fade-up 0.8s var(--ease) both;
  }
  /* the second half of the title always gets its own line */
  h1 .grad {
    display: block;
    width: fit-content;
    padding-bottom: 0.08em;
  }
  .lead {
    margin-top: 1.4rem;
    font-size: clamp(1rem, 1.6vw, 1.15rem);
    color: var(--muted);
    max-width: 58ch;
    animation: fade-up 0.8s 0.08s var(--ease) both;
  }
  .actions {
    margin-top: 1.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    animation: fade-up 0.8s 0.16s var(--ease) both;
  }

  .steps {
    display: grid;
    gap: 1.6rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .steps li {
    display: grid;
    gap: 0.7rem;
    min-width: 0;
  }
  .steps p {
    max-width: none;
  }
  .n {
    color: var(--accent-text);
    font-size: 0.85rem;
    margin-right: 0.5rem;
  }

  .sites {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 0.9rem;
  }
  .sites a {
    height: 100%;
    padding: 1rem 1.1rem;
    display: grid;
    gap: 0.3rem;
    justify-items: start;
    align-content: start;
    text-decoration: none;
    color: var(--text);
  }
  .name {
    font-weight: 700;
    font-size: 1.05rem;
  }
  .domain {
    font-size: 0.75rem;
    color: var(--accent-text);
  }
  .what {
    font-size: 0.9rem;
    color: var(--muted);
    margin-block: 0.2rem 0.5rem;
  }

  .exports {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
    gap: 0.9rem;
  }
  .exports li {
    padding: 1rem 1.1rem;
    display: grid;
    gap: 0.4rem;
    align-content: start;
  }
  .exports code {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--accent-text);
    overflow-wrap: anywhere;
  }
  .pkg {
    color: var(--muted);
    font-weight: 400;
  }
  .exports p {
    font-size: 0.9rem;
    color: var(--muted);
  }
</style>
