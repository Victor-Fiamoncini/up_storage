import { connect } from 'mongoose'

export default async () => {
	const { DB_NAME, DB_PORT, DB_HOST, MONGO_URL } = process.env

	const url = MONGO_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

	try {
		await connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})

		console.log('Connected to MongoDB')
	} catch (err) {
		throw new Error('Error to connect in MongoDB 🔥')
	}
}
