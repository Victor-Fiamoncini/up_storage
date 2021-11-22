class UnimplementedMethodError extends Error {
	constructor() {
		super('Unimplemented method error')

		this.name = 'UnimplementedMethodError'
	}
}

module.exports = UnimplementedMethodError
