import { connect } from 'mongoose'

export default async () => {
	const {
		DB_NAME,
		DB_TEST,
		DB_PORT,
		DB_HOST,
		NODE_ENV,
		MONGO_PRODUCTION_URL,
	} = process.env

	let url = ''

	if (NODE_ENV !== 'production') {
		url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_TEST}`
	} else {
		url = MONGO_PRODUCTION_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
	}

	try {
		await connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		})

		console.log('Connected to mongodb')
	} catch (err) {
		console.log('Error to connect in mongodb 🔥')
		process.exit(1)
	}
}
