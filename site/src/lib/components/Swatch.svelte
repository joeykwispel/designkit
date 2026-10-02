<script lang="ts">
  import { AA, format, isColor, value as tokenValue, type Theme } from '$lib/data/tokens';

  /** One value of a token in one theme: a chip painted on that theme's page background, the value, and its contrast if it is text. */
  let { value, theme, ratio }: { value: string; theme: Theme; ratio?: number } = $props();
</script>

<span class="swatch">
  {#if isColor(value)}
    <span class="chip" style:background={tokenValue('bg', theme)} aria-hidden="true"><span style:background={value}></span></span>
  {/if}
  <span class="text">
    <span class="mono">{value}</span>
    {#if ratio !== undefined}
      <span class="ratio mono" class:fail={ratio < AA}>{format(ratio)} {ratio >= AA ? 'AA' : '< AA'}</span>
    {/if}
  </span>
</span>

<style>
  .swatch {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 11rem;
  }
  .chip {
    flex: none;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    overflow: hidden;
    display: grid;
  }
  .text {
    display: grid;
    line-height: 1.35;
  }
  .ratio {
    font-size: 0.7rem;
    color: var(--muted);
  }
  .ratio.fail {
    color: var(--syn-num);
  }
</style>
