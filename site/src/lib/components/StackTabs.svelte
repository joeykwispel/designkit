<script lang="ts">
  import { onMount, type Snippet } from 'svelte';
  import { app } from '$lib/app.svelte';
  import { stackKeys, stackNames, type StackKey } from '$lib/data/stacks';
  import { t } from '$lib/locales';

  /**
   * Tabs for the four stacks. The choice is shared by every tab group on the site and remembered,
   * so someone on Angular sees Angular everywhere.
   */
  let { id, children }: { id: string; children: Snippet<[StackKey]> } = $props();

  const ui = $derived(t(app.locale).ui);
  let tabs = $state<HTMLButtonElement[]>([]);

  onMount(() => app.restoreStack());

  function onkeydown(e: KeyboardEvent) {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (stackKeys.indexOf(app.stack) + step + stackKeys.length) % stackKeys.length;
    app.setStack(stackKeys[next]);
    tabs[next]?.focus();
  }
</script>

<div class="tabs mono" role="tablist" aria-label={ui.stack} tabindex="-1" {onkeydown}>
  {#each stackKeys as key, i (key)}
    <button
      bind:this={tabs[i]}
      type="button"
      role="tab"
      id="{id}-tab-{key}"
      aria-selected={app.stack === key}
      aria-controls="{id}-panel"
      tabindex={app.stack === key ? 0 : -1}
      onclick={() => app.setStack(key)}>{stackNames[key]}</button
    >
  {/each}
</div>

<div class="panel" role="tabpanel" id="{id}-panel" aria-labelledby="{id}-tab-{app.stack}">
  {@render children(app.stack)}
</div>

<style>
  .tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }
  button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
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
  button[aria-selected='true'] {
    color: var(--accent-ink);
    background: var(--accent);
    border-color: transparent;
  }
  .panel {
    display: grid;
    gap: 1.4rem;
    min-width: 0;
  }
</style>
