import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  // the Svelte header is rendered on the server in the markup parity test
  plugins: [svelte()],
  test: { include: ['test/**/*.test.{ts,tsx}'], environment: 'node' }
});
