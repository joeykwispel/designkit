<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { highlight, type Lang } from '$lib/highlight';
  import { t } from '$lib/locales';

  /** A code sample in an editor window: file name in the title bar, the kit's syntax colours, a copy button. */
  let { code, lang, file }: { code: string; lang: Lang; file: string } = $props();

  const ui = $derived(t(app.locale).ui);
  const tokens = $derived(highlight(code, lang));
  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      clearTimeout(timer);
      timer = setTimeout(() => (copied = false), 1600);
    } catch {
      /* clipboard unavailable: the code is still there to select */
    }
  }
</script>

<figure class="code glass">
  <figcaption class="chrome mono">
    <span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="file">{file}</span>
    <button type="button" class="copy" onclick={copy} aria-label="{ui.copy}: {file}">{copied ? ui.copied : ui.copy}</button>
  </figcaption>
  <!-- tabindex: a block that scrolls sideways has to be reachable with the keyboard -->
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre class="mono" tabindex="0"><code
      >{#each tokens as token, i (i)}{#if token.cls}<span class={token.cls}>{token.text}</span>{:else}{token.text}{/if}{/each}</code
    ></pre>
</figure>

<style>
  .code {
    margin: 0;
    overflow: hidden;
    min-width: 0;
    background: color-mix(in srgb, var(--bg) 75%, transparent);
  }
  .chrome {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.4rem 0.5rem 0.4rem 0.9rem;
    font-size: 0.7rem;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .dots {
    display: flex;
    gap: 5px;
  }
  .dots i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--border);
  }
  .file {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .copy {
    font-family: var(--mono);
    font-size: 0.7rem;
    color: var(--muted);
    padding: 0.2rem 0.55rem;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: transparent;
    transition:
      color 0.2s,
      border-color 0.2s;
  }
  .copy:hover {
    color: var(--accent-text);
    border-color: color-mix(in srgb, var(--accent) 50%, var(--border));
  }
  pre {
    margin: 0;
    padding: 0.9rem 1.1rem;
    font-size: 0.8rem;
    line-height: 1.7;
    overflow-x: auto;
    tab-size: 2;
  }
  pre:focus-visible {
    outline-offset: -2px;
  }
</style>
