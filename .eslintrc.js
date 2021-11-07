module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:react/recommended",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'spaced-comment': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowExpressions: true,
    }],
    '@typescript-eslint/no-explicit-any': 'off',
    'max-classes-per-file': 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
    'max-len': ['error', { 'code': 120 }],
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
  },
  settings: {
    react: {
      version: '17',
    },
  },
};
