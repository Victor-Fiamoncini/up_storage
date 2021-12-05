module.exports = {
	bail: 1,
	moduleFileExtensions: ['js', 'json'],
	coverageDirectory: 'coverage',
	testEnvironment: 'node',
	transform: {
		'^.+\\.(js)?$': 'babel-jest',
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/$1',
	},
	testMatch: ['<rootDir>/**/*.test.js'],
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
