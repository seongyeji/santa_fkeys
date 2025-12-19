// @ts-check
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt([
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      'vue/multi-word-component-names': [
        'error',
        {
          ignores: ['default', 'index', 'error']
        }
      ]
    }
  },
  {
    ignores: [
      'node_modules',
      'dist',
      'public',
      '.nuxt',
      '.output',
      '.nitro',
      'coverage'
    ]
  },
  eslintConfigPrettier
])
