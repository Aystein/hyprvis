module.exports = {
  root: true,
  env: { browser: true, es2020: true, es6: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Disables jsx-a11y https://github.com/import-js/eslint-plugin-import/blob/v2.25.4/docs/rules/no-webpack-loader-syntax.md
    // eslint-disable-next-line global-require
    ...Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
      acc[`jsx-a11y/${rule}`] = 'off';
      return acc;
    }, {}),
    'class-methods-use-this': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-continue': 'off',
    'no-multi-assign': 'warn',
    'no-nested-ternary': 'off',
    'no-return-assign': 'warn',
    'no-restricted-exports': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-prototype-builtins': 'warn',
    'no-minusminus': 'off',
    'no-underscore-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'warn',
    'max-classes-per-file': 'off',
    'no-param-reassign': ['warn', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'cypress/unsafe-to-chain-command': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-webpack-loader-syntax': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'error',
    'prefer-destructuring': ['warn', { object: true, array: false }],
    'prefer-promise-reject-errors': 'warn',
    'prefer-spread': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react/destructuring-assignment': 'off',
    'react/jsx-curly-brace-presence': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unused-class-component-methods': 'warn',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off'
  }
}
