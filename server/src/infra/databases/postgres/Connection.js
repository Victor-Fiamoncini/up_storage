import knex from 'knex'
import configs from '@/src/infra/databases/postgres/knexfile'
import PostgresConnectionError from '@/src/infra/errors/PostgresConnectionError'

class Connection {
	static get instance() {
		if (!Connection._instance) {
			Connection._instance = this._connect
		}

		return Connection._instance
	}

	static get _connect() {
		try {
			return knex(configs.development)
		} catch (err) {
			throw new PostgresConnectionError(err.message)
		}
	}
}

export default Connection
