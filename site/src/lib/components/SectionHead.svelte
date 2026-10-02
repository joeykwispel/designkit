<script lang="ts">
  import { reveal } from '$lib/utils/actions';

  /** A section title written as a tag, <Tokens/>, the way the portfolio does it, with a file-path label above. */
  let { title, path, intro, level = 2 }: { title: string; path?: string; intro?: string; level?: 1 | 2 } = $props();
</script>

<div class="section-head" use:reveal>
  {#if path}<p class="path">{path}</p>{/if}
  <svelte:element this={`h${level}`} class="title mono">
    <span class="br" aria-hidden="true">&lt;</span>{title}<span class="br" aria-hidden="true">/&gt;</span>
  </svelte:element>
  {#if intro}<p>{intro}</p>{/if}
</div>

<style>
  .title {
    font-size: clamp(1.6rem, 3.4vw, 2.3rem);
    letter-spacing: -0.04em;
  }
  .br {
    color: var(--accent-text);
  }
</style>
