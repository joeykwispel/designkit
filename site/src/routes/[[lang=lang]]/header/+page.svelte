<script lang="ts">
  import headerHtml from '@joeykwispel/design-kit/header.html?raw';
  import angularComponent from '$lib/recipes/jo-header.component.ts.txt?raw';
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import { commandMenu, headerUsage } from '$lib/data/stacks';
  import { reveal } from '$lib/utils/actions';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import Playground from '$lib/components/Playground.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import StackTabs from '$lib/components/StackTabs.svelte';

  const c = $derived(t(app.locale));
  const k = $derived(c.header);

  const behaviourRows = ['progress', 'frosted', 'active', 'menu', 'numbers', 'theme', 'search'] as const;
  const props = [
    { name: 'links', type: 'HeaderLink[]' },
    { name: 'languages', type: 'HeaderLanguage[]' },
    { name: 'labels', type: 'HeaderLabels' },
    { name: 'homeHref', type: 'string' },
    { name: 'onSearch', type: '() => void' },
    { name: 'onLanguage', type: '(code: string) => void' },
    { name: 'skip', type: 'boolean' }
  ] as const;
</script>

<PageHead title={k.title} description={k.description} intro={k.intro} path="/header/" file="~/designkit/header/" />

<section class="section" id="playground">
  <div class="container">
    <SectionHead title={k.play.title} path={k.play.path} intro={k.play.intro} />
    <div use:reveal><Playground /></div>
  </div>
</section>

<section class="section" id="per-app">
  <div class="container">
    <SectionHead title={k.changes.title} path={k.changes.path} />
    <div class="two">
      <div use:reveal>
        <p class="lead">{k.changes.intro}</p>
        <ul class="rules">
          {#each k.changes.items as item (item)}<li>{item}</li>{/each}
        </ul>
      </div>
      <div use:reveal>
        <p class="lead">{k.changes.sameIntro}</p>
        <p class="note">{k.changes.same}</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="behaviour">
  <div class="container">
    <SectionHead title={k.behaviour.title} path={k.behaviour.path} intro={k.behaviour.intro} />
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="table-wrap" role="region" aria-label={k.behaviour.title} tabindex="0" use:reveal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{k.behaviour.feature}</th>
            <th scope="col">{k.behaviour.how}</th>
          </tr>
        </thead>
        <tbody>
          {#each behaviourRows as row (row)}
            <tr>
              <th scope="row">{k.behaviour.rows[row].feature}</th>
              <td class="how">{k.behaviour.rows[row].how}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" id="usage">
  <div class="container">
    <SectionHead title={k.usage.title} path={k.usage.path} intro={k.usage.intro} />
    <StackTabs id="usage">
      {#snippet children(stack)}
        <p class="note">{k.usage[stack]}</p>
        {#each headerUsage[stack] as block (block.file)}
          <CodeBlock {...block} />
        {/each}
        {#if stack === 'angular'}
          <details>
            <summary class="mono">{k.usage.angularFile}: jo-header.component.ts</summary>
            <CodeBlock code={angularComponent} lang="js" file="src/app/jo/jo-header.component.ts" />
          </details>
        {:else if stack === 'html'}
          <details>
            <summary class="mono">{k.usage.htmlFile}: header.html</summary>
            <CodeBlock code={headerHtml} lang="html" file="header.html" />
          </details>
        {/if}
      {/snippet}
    </StackTabs>
  </div>
</section>

<section class="section" id="props">
  <div class="container">
    <SectionHead title={k.props.title} path={k.props.path} intro={k.props.intro} />
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="table-wrap" role="region" aria-label={k.props.title} tabindex="0" use:reveal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{k.props.prop}</th>
            <th scope="col">{k.props.type}</th>
            <th scope="col">{k.props.notes}</th>
          </tr>
        </thead>
        <tbody>
          {#each props as prop (prop.name)}
            <tr>
              <th scope="row"><code>{prop.name}</code></th>
              <td><span class="mono type">{prop.type}</span></td>
              <td class="how">{k.props.rows[prop.name]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <h3 class="sub">{k.props.menuTitle}</h3>
    <div use:reveal><CodeBlock {...commandMenu} /></div>
  </div>
</section>

<style>
  .two {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(340px, 100%), 1fr));
    gap: 1.5rem 2.5rem;
  }
  .lead {
    font-weight: 600;
    margin-bottom: 0.8rem;
  }
  .how {
    color: var(--muted);
  }
  .type {
    white-space: nowrap;
    color: var(--syn-fn);
  }
  details {
    min-width: 0;
  }
  summary {
    cursor: pointer;
    font-size: 0.82rem;
    color: var(--accent-text);
    padding-block: 0.4rem;
    width: fit-content;
  }
  details[open] summary {
    margin-bottom: 0.6rem;
  }
</style>
