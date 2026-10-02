<script lang="ts">
  import { app } from '$lib/app.svelte';
  import { t } from '$lib/locales';
  import SectionHead from './SectionHead.svelte';
  import Seo from './Seo.svelte';

  /** The top of a content page: its <head> tags and the h1, written as a tag like every section title. */
  let { title, description, intro, path, file }: { title: string; description: string; intro: string; path: string; file: string } = $props();

  const meta = $derived(t(app.locale).meta);
</script>

<Seo title="{title} | {meta.suffix}" {description} {path} imageAlt={meta.imageAlt} />

<section class="page-head">
  <div class="container">
    <SectionHead level={1} {title} path={file} {intro} />
  </div>
</section>
