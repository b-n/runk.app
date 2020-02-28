module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended'
  ],
  settings: {
    react: {
        version: "detect"
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'react'
  ],
  rules: {
    'no-undef': 'off',
    '@typescript-eslint/camelcase': [2, {
      properties: 'always',
      allow: [
        'access_token',
        'token_type',
        'expires_in',
        'refresh_token',
        'client_id',
        'client_secret',
        'grant_type',
        'redirect_uri',
        'id_token',
        'response_type',
        'access_type',
      ]
    }],
    '@typescript-eslint/member-delimiter-style': [2, {
      'multiline': {
        delimiter: 'semi',
      }
    }],
    '@typescript-eslint/no-empty-function': [1],
    '@typescript-eslint/no-explicit-any': [0],
    'react/prop-types': [0],
    'comma-dangle': [2, {
      'objects': 'always-multiline',
      'arrays': 'always-multiline',
      'functions': 'never',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
    }],
    '@typescript-eslint/no-unused-vars': [2, {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
    }],
    'space-before-function-paren': [2, {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'semi': [ 2, 'always', {
      'omitLastInOneLineBlock': true
    }],
  },
}
