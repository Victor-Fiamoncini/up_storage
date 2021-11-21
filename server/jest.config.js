// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	bail: true,
	clearMocks: true,
	coverageDirectory: 'test/coverage',
	setupFiles: ['./test/env.js'],
	testEnvironment: 'node',
	testMatch: ['**/test/**/*.test.js?(x)'],
}
