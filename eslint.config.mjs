import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    rules: {
      'quotes': ['error', 'single'],
      'object-curly-spacing': ['error', 'always'],
      'react/jsx-curly-brace-presence': ['error', {
        'props': 'never', // не использует {} для строковых пропсов
        'children': 'never'
      }],
      indent: ['error', 2], // 2 пробела для отступов
      'react/jsx-indent': ['error', 2], // 2 пробела для JSX отступов
      'react/jsx-indent-props': ['error', 2], // 2 пробела для отступов пропсов
      'react/jsx-first-prop-new-line': ['error', 'multiline'], // первый пропс на новой строке, если несколько пропсов
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 2, // максимум 1 пропс на строку
          when: 'multiline', // только для многострочных элементов
        },
      ],
      'react/jsx-closing-bracket-location': ['error', 'line-aligned'], // закрывающий тег на одной линии с открывающим
      'react/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      'react/jsx-curly-spacing': [
        'error',
        {
          when: 'never',
          children: true,
        },
      ], // отсутствие пробелов внутри {}
      'react/jsx-wrap-multilines': [
        'error',
        {
          declaration: 'parens-new-line',
          assignment: 'parens-new-line',
          return: 'parens-new-line',
          arrow: 'parens-new-line',
          condition: 'parens-new-line',
          logical: 'parens-new-line',
          prop: 'parens-new-line',
        },
      ],
      'react/jsx-newline': [
        'error',
        {
          prevent: true,
          allowMultilines: false,
        },
      ], // JSX элементы на новой строке
      'react/jsx-props-no-multi-spaces': 'error', // запрет нескольких пробелов между пропсами
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react/jsx-no-useless-fragment': 'error',
      'jsx-quotes': ['error', 'prefer-single'],
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ],
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
  },

]);

export default eslintConfig;
