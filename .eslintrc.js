module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'google'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react-hooks'
  ],
  rules: {
    // react rules
    'react-hooks/rules-of-hooks': 'error', 
    'react-hooks/exhaustive-deps': 'warn',

    // typescript rules
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',

    // js rules
    'eol-last': 'error'
  },
  settings: {
    react: {
      version: 'detect' 
    }
  }
};
