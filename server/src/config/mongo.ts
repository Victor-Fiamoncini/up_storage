import { connect, Mongoose } from 'mongoose'

class MongooseConnection {
	private readonly url: string
	private connection: Mongoose | undefined

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

	public async connect() {
		try {
			this.connection = await connect(this.url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			})

			console.log('Connected to mongodb')
		} catch (err) {
			console.error('Error to connect in mongodb')
		}
	}

	public async close() {
		await this.connection?.disconnect()
	}
}

export default new MongooseConnection()
