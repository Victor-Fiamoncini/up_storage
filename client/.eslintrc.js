module.exports = {
	env: {
		browser: true,
		es6: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier',
		'react-app',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	plugins: ['eslint-plugin-import-helpers', 'prettier', 'react', 'react-hooks'],
	rules: {
		// syntax
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'linebreak-style': 0,
		quotes: ['error', 'single'],
		semi: ['error', 'never'],
		'no-unused-vars': 'off',
		'no-case-declarations': 'off',
		// react-hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		// import-helpers
		'import-helpers/order-imports': [
			'warn',
			{
				newlinesBetween: 'always',
				groups: ['/^react/', 'module', '/^@/src/', ['parent', 'sibling', 'index']],
				alphabetize: { order: 'asc', ignoreCase: true },
			},
		],
	},
}
