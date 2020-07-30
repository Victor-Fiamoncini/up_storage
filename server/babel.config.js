module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@src': './src',
					'@routes': './src/routes',
					'@config': './src/config',
					'@middlewares': './src/app/middlewares',
					'@models': './src/app/models',
					'@controllers': './src/app/controllers',
					'@services': './src/app/services',
					'@repositories': './src/app/repositories',
				},
			},
		],
	],
	ignore: ['**/*.spec.ts'],
}
