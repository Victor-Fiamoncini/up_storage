import { connect } from 'mongoose'

export default async () => {
	const {
		DB_NAME,
		DB_TEST,
		DB_PORT,
		DB_HOST,
		DB_USER,
		DB_PASS,
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
			user: DB_USER,
			pass: DB_PASS,
			auth: { authSource: 'admin' },
		})

		console.log('Connected to mongodb')
	} catch (err) {
		console.log('Error to connect in mongodb 🔥', err)
		process.exit(1)
	}
}
