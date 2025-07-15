import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    ignores: ['dist/main.js', 'webpack.config.js'],
    plugins: { js },
    languageOptions: { globals: globals.browser },
    extends: ['js/recommended'],
    rules: {
      'no-console': 'off',
    },
  },
]);
