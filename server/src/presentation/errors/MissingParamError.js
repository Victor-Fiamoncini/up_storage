class MissingParamError extends Error {
	constructor(param = '') {
		super(`Missing param (${param}) in request object`)

		this.name = 'MissingParamError'
	}
}

export default MissingParamError
