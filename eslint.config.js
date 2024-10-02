// @ts-check
import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['node_modules', '**/dist/**'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // @ts-expect-error https://github.com/vuejs/eslint-plugin-vue/issues/2555
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  eslintConfigPrettier,
)
