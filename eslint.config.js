import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    plugins: ['@eslint/js', 'eslint-plugin-react-hooks', 'eslint-plugin-react-refresh'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])
