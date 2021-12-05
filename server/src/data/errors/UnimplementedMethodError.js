class UnimplementedMethodError extends Error {
	constructor() {
		super('Unimplemented method error')

		this.name = 'UnimplementedMethodError'
	}
}

export default UnimplementedMethodError
