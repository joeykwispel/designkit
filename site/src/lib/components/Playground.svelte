<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import { PREVIEW_PATH } from '$lib/nav';

  /**
   * The header in a frame. A frame, not a component on this page, because the header is fixed to the top of
   * its document and folds at a viewport width: only a document of its own can show both.
   */
  const p = $derived(t(app.locale).header.play);

  const widths = [
    { key: 'mobile', px: 390 },
    { key: 'tablet', px: 1000 },
    { key: 'desktop', px: 1440 }
  ] as const;
  const HEIGHT = 460;

  let width = $state(1440);
  let links = $state(4);
  let search = $state(false);
  /** Width of the stage on this page. The frame keeps its own width and is scaled down to fit. */
  let stage = $state(0);

  const scale = $derived(stage ? Math.min(1, stage / width) : 1);
  const src = $derived(`${app.href(PREVIEW_PATH)}#links=${links}&search=${search ? 1 : 0}`);
</script>

<div class="controls mono">
  <div class="group" role="group" aria-label={p.width}>
    <span class="label">{p.width}</span>
    {#each widths as w (w.key)}
      <button type="button" aria-pressed={width === w.px} onclick={() => (width = w.px)}>{p[w.key]} <span class="px">{w.px}</span></button>
    {/each}
  </div>
  <div class="group" role="group" aria-label={p.links}>
    <span class="label">{p.links}</span>
    {#each [0, 2, 4] as n (n)}
      <button type="button" aria-pressed={links === n} onclick={() => (links = n)}>{n}</button>
    {/each}
  </div>
  <div class="group">
    <button type="button" aria-pressed={search} onclick={() => (search = !search)}>{p.search}</button>
  </div>
</div>

<div class="stage glass" bind:clientWidth={stage} style:height="{HEIGHT * scale}px">
  <iframe {src} title={p.frame} style:width="{width}px" style:height="{HEIGHT}px" style:transform="translateX(-50%) scale({scale})"></iframe>
</div>

<style>
  .controls {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem 1.4rem;
    margin-bottom: 1rem;
    font-size: 0.78rem;
  }
  .group {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem;
  }
  .label {
    color: var(--muted);
    margin-right: 0.2rem;
  }
  button {
    padding: 0.35rem 0.7rem;
    font-weight: 600;
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    background: var(--surface);
    transition:
      color 0.2s,
      border-color 0.2s,
      background 0.2s;
  }
  button:hover {
    color: var(--text);
    border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  }
  button[aria-pressed='true'] {
    color: var(--accent-ink);
    background: var(--accent);
    border-color: transparent;
  }
  .px {
    font-weight: 400;
  }
  .stage {
    position: relative;
    overflow: hidden;
    background: var(--bg);
  }
  /* Centred in the stage. Wider than the stage, it is scaled down from the top centre so it still fits. */
  iframe {
    position: absolute;
    top: 0;
    left: 50%;
    border: 0;
    transform-origin: top center;
  }
</style>
