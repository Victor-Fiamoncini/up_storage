class MissingHttpRequestError extends Error {
	constructor() {
		super('Missing httpRequest object')

		this.name = 'MissingHttpRequestError'
	}
}

export default MissingHttpRequestError
