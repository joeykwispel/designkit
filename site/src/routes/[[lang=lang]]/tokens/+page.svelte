<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { fill, t } from '$lib/locales';
  import { baseTokens, colorTokens, format, gaps, ratio, syntaxTokens, themes } from '$lib/data/tokens';
  import { reveal } from '$lib/utils/actions';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PageHead from '$lib/components/PageHead.svelte';
  import SectionHead from '$lib/components/SectionHead.svelte';
  import Swatch from '$lib/components/Swatch.svelte';

  const c = $derived(t(app.locale));
  const k = $derived(c.tokens);
  const themeName = $derived({ dark: c.ui.dark, light: c.ui.light });

  type UseKey = keyof typeof k.colors.uses;
  const base = (name: string) => baseTokens.find((b) => b.name === name)?.value ?? '';
  /** --syn-num is the one class that is not named after its token: .num is too easy to clash with. */
  const syntaxClass = (name: string) => (name === 'syn-num' ? 'num-t' : name.slice(4));

  const gradient = 'background: linear-gradient(90deg, var(--accent), var(--accent-2));';
  const mixing = `/* a teal-tinted border on hover */
border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
/* a soft teal fill */
background: color-mix(in srgb, var(--accent) 12%, transparent);`;

  const typeRows = ['body', 'mono', 'h1', 'h2', 'h3'] as const;
  const shapeRows = ['navH', 'container', 'header', 'section', 'radius', 'radiusSm', 'tag', 'pill', 'icon'] as const;
  const shapes = [
    { label: '--radius', radius: 'var(--radius)' },
    { label: '--radius-sm', radius: 'var(--radius-sm)' },
    { label: '6px', radius: '6px' },
    { label: '999px', radius: '999px' }
  ];

  let played = $state(false);
</script>

<PageHead title={k.title} description={k.description} intro={k.intro} path="/tokens/" file="~/designkit/tokens/" />

<section class="section" id="colors">
  <div class="container">
    <SectionHead title={k.colors.title} path={k.colors.path} intro={k.colors.intro} />
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="table-wrap" role="region" aria-label={k.colors.title} tabindex="0" use:reveal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{k.colors.token}</th>
            {#each themes as theme (theme)}<th scope="col">{themeName[theme]}</th>{/each}
            <th scope="col">{k.colors.use}</th>
          </tr>
        </thead>
        <tbody>
          {#each colorTokens as token (token.name)}
            <tr>
              <th scope="row"><code>--{token.name}</code></th>
              {#each themes as theme (theme)}
                <td><Swatch value={token[theme]} {theme} ratio={ratio(token.name, theme)} /></td>
              {/each}
              <td class="use">{k.colors.uses[token.name as UseKey]}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="pair">
      <div class="stack-y" use:reveal>
        <p class="note">{k.colors.gradient}</p>
        <div class="gradient" aria-hidden="true"></div>
        <CodeBlock code={gradient} lang="css" file="gradient.css" />
      </div>
      <div class="stack-y" use:reveal>
        <p class="note">{k.colors.mixing}</p>
        <CodeBlock code={mixing} lang="css" file="mixing.css" />
      </div>
    </div>

    {#if gaps.length}
      <h3 class="sub" id="gaps">{k.colors.gapsTitle}</h3>
      <p class="note">{k.colors.gapsIntro}</p>
      <ul class="rules gaps mono">
        {#each gaps as gap (gap.token + gap.on + gap.theme)}
          <li>
            {fill(k.colors.gap, { token: `--${gap.token}`, on: `--${gap.on}`, theme: themeName[gap.theme].toLowerCase(), ratio: format(gap.ratio) })}
          </li>
        {/each}
      </ul>
    {:else}
      <p class="note sub">{k.colors.passes}</p>
    {/if}
  </div>
</section>

<section class="section" id="syntax">
  <div class="container">
    <SectionHead title={k.syntax.title} path={k.syntax.path} intro={k.syntax.intro} />
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="table-wrap" role="region" aria-label={k.syntax.title} tabindex="0" use:reveal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{k.colors.token}</th>
            <th scope="col">class</th>
            {#each themes as theme (theme)}<th scope="col">{themeName[theme]}</th>{/each}
          </tr>
        </thead>
        <tbody>
          {#each syntaxTokens as token (token.name)}
            <tr>
              <th scope="row"><code>--{token.name}</code></th>
              <td><span class="mono {syntaxClass(token.name)}">.{syntaxClass(token.name)}</span></td>
              {#each themes as theme (theme)}
                <td><Swatch value={token[theme]} {theme} ratio={ratio(token.name, theme)} /></td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" id="typography">
  <div class="container">
    <SectionHead title={k.type.title} path={k.type.path} intro={k.type.intro} />
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="table-wrap" role="region" aria-label={k.type.title} tabindex="0" use:reveal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{k.type.role}</th>
            <th scope="col">{c.ui.preview}</th>
            <th scope="col">{k.type.notes}</th>
          </tr>
        </thead>
        <tbody>
          {#each typeRows as row (row)}
            <tr>
              <th scope="row">{k.type.rows[row].role}</th>
              <td>
                <span class="specimen {row}">
                  {#if row === 'h2'}<span class="br">&lt;</span>{k.type.title}<span class="br">/&gt;</span>{:else}{k.type.sample}{/if}
                </span>
              </td>
              <td class="use">{k.type.rows[row].notes}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <p class="note sub">{k.type.fonts}</p>
  </div>
</section>

<section class="section" id="shape">
  <div class="container">
    <SectionHead title={k.shape.title} path={k.shape.path} intro={k.shape.intro} />
    <ul class="shapes" use:reveal>
      {#each shapes as shape (shape.label)}
        <li>
          <span class="shape" style:border-radius={shape.radius} aria-hidden="true"></span>
          <code class="mono">{shape.label}</code>
        </li>
      {/each}
    </ul>
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <div class="table-wrap" role="region" aria-label={k.shape.title} tabindex="0" use:reveal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">{k.shape.rule}</th>
            <th scope="col">{k.shape.value}</th>
          </tr>
        </thead>
        <tbody>
          {#each shapeRows as row (row)}
            <tr>
              <th scope="row"><code>{k.shape.rows[row].rule}</code></th>
              <td class="use">{k.shape.rows[row].value}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section" id="motion">
  <div class="container">
    <SectionHead title={k.motion.title} path={k.motion.path} intro={k.motion.intro} />
    <div class="motion glass" use:reveal>
      {#each ['ease', 'spring'] as const as name (name)}
        <div class="easing">
          <p><code class="mono">--{name}</code> <span class="use">{k.motion[name]}</span></p>
          <p class="mono value">{base(name)}</p>
          <div class="track" aria-hidden="true"><span class="dot {name}" class:played></span></div>
        </div>
      {/each}
      <button type="button" class="btn" aria-pressed={played} onclick={() => (played = !played)}><span aria-hidden="true">▶</span> {k.motion.play}</button>
    </div>
    <ul class="rules sub">
      {#each k.motion.rules as rule (rule)}<li>{rule}</li>{/each}
    </ul>
  </div>
</section>

<style>
  .use {
    color: var(--muted);
  }
  .pair {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(360px, 100%), 1fr));
    gap: 1.2rem;
    margin-top: 1.6rem;
    align-items: start;
  }
  .gradient {
    height: 12px;
    border-radius: 999px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
  }
  .gaps {
    margin-top: 0.8rem;
    font-size: 0.85rem;
  }
  .gaps li {
    color: var(--text);
  }

  /* Live samples of the type roles. Spans, not headings, so the page outline stays clean. */
  .specimen {
    display: block;
    min-width: 14rem;
  }
  .specimen.mono {
    font-size: 0.9rem;
  }
  .specimen.h1 {
    font-size: 2.2rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 0.95;
  }
  .specimen.h2 {
    font-family: var(--mono);
    font-size: 1.6rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.15;
  }
  .specimen.h3 {
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .br {
    color: var(--accent-text);
  }

  .shapes {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.6rem;
    margin-bottom: 1.4rem;
  }
  .shapes li {
    display: grid;
    gap: 0.5rem;
    justify-items: start;
  }
  .shape {
    width: 120px;
    height: 64px;
    border: 1px solid color-mix(in srgb, var(--accent) 55%, var(--border));
    background: color-mix(in srgb, var(--accent) 12%, transparent);
  }
  .shapes code {
    font-size: 0.78rem;
    color: var(--muted);
  }

  .motion {
    padding: 1.2rem 1.3rem;
    display: grid;
    gap: 1.2rem;
    justify-items: start;
  }
  .easing {
    width: 100%;
    display: grid;
    gap: 0.3rem;
  }
  .easing code {
    color: var(--accent-text);
    font-size: 0.85rem;
  }
  .value {
    font-size: 0.75rem;
    color: var(--muted);
  }
  .track {
    margin-top: 0.4rem;
    height: 22px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    /* room for the spring to overshoot */
    padding-inline: 3px 14%;
    display: flex;
    align-items: center;
  }
  .dot {
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--accent);
    transition: margin-left 0.9s var(--ease);
  }
  .dot.spring {
    background: var(--accent-2);
    transition-timing-function: var(--spring);
  }
  .dot.played {
    margin-left: calc(100% - 14px);
  }
</style>
