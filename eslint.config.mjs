import eslintConfigDhwani from '@dhwani/eslint-config';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/build/**', '.turbo/**'],
  },
  ...eslintConfigDhwani,
];
