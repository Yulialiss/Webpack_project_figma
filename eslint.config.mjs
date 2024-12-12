// eslint.config.mjs
import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'react/prop-types': 'off',
  },
});
