class PostgresConnectionError extends Error {
	constructor(message) {
		super(message ?? 'Error to connect in postgres database')

		this.name = 'PostgresConnectionError'
	}
}

export default PostgresConnectionError
