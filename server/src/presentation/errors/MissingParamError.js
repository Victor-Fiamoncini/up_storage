class MissingParamError extends Error {
	constructor(param = '') {
		super(`Missing param (${param}) in request object`)

		this.name = 'MissingParamError'
	}
}

module.exports = MissingParamError
