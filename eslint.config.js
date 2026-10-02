import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: { parserOptions: { extraFileExtensions: ['.svelte'], parser: ts.parser } }
  },
  {
    rules: {
      // Internal links are built with app.href()/localize(), which already prefix the base path
      'svelte/no-navigation-without-resolve': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },
  {
    ignores: ['**/dist/', '**/.svelte-kit/', '**/node_modules/', '**/test-results/', '**/playwright-report/', '.playwright-mcp/', '**/.lighthouseci/']
  }
);
