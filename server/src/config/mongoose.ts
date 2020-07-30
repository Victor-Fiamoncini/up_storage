import { connect, Mongoose } from 'mongoose'

class Mongo {
	private connection!: Mongoose

	async connect(): Promise<void> {
		const { DB_NAME, DB_PORT, DB_HOST, MONGO_URL } = process.env

		const url = MONGO_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

		try {
			this.connection = await connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			})
		} catch (err) {
			throw new Error('Error to connect in MongoDB')
		}
	}

	async disconnect(): Promise<void> {
		await this.connection.disconnect()
	}
}

export default Mongo
