import { connect } from 'mongoose'

class MongooseConnection {
	private url: string

	constructor() {
		const {
			DB_NAME,
			DB_TEST,
			DB_PORT,
			DB_HOST,
			NODE_ENV,
			MONGO_PRODUCTION_URL,
		} = process.env

		this.url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_TEST}`

		if (NODE_ENV === 'production') {
			this.url =
				MONGO_PRODUCTION_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
		}
	}

	private async connect() {
		try {
			await connect(this.url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			})

			console.log('Connected to mongodb')
		} catch (err) {
			console.log('Error to connect in mongodb')
		}
	}

	private async close() {
		// await this.connection.
	}
}

export default new MongooseConnection()
