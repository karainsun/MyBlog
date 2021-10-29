module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  parser: ['vue-eslint-parser'],
  rules: {
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    "quotes": [0, "single"], // 禁用引号检查	引号类型 `` "" ''
    "semi": 0, // 禁用分号检查	[1, "always"]: 需要分号, [2, "never"]: 不加分号, 0: 禁用此项
    "vue/html-self-closing": "off",
    "vue/no-parsing-error": [2, {
      "x-invalid-end-tag": true,
    }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      // 解决tsconfig下的path别名导致eslint插件无法解决的bug
      typescript: {
        alwaysTryTypes: true
      }
    }
  }
}
