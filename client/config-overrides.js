const { alias } = require('react-app-rewire-alias')

module.exports = function override(config) {
	alias({ '@/src': 'src' })(config)

	return config
}
