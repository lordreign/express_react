const indentSpace = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    indent: ['error', indentSpace, { ArrayExpression: 1, MemberExpression: 1, ObjectExpression: 1 }],
    'max-len': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-return-await': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': ['error', { allow: ['state'] }],
    'prefer-destructuring': ['error', { object: false, array: false }],
    'import/extensions': 'off',
    'linebreak-style': 0,
    'import/no-unresolved': ['error', { caseSensitive: false, ignore: ['@'] }],
    'array-element-newline': ['error', {
      ArrayExpression: 'consistent',
      ArrayPattern: { minItems: 1 },
    }],
    'import/no-dynamic-require': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
  },
};
