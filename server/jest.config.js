module.exports = {
	clearMocks: true,
	collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	coverageReporters: ['text-summary', 'lcov'],
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['**/*.spec.ts'],
	globals: {
		'ts-jest': {
			isolatedModules: true,
		},
	},
}
