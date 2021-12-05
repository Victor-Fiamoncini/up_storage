import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(__dirname, '..', '..', '..', '.env') })

const {
	NODE_ENV,
	PORT,
	DB_NAME,
	DB_PORT,
	DB_HOST,
	DB_USER,
	DB_PASS,
} = process.env

export default {
	app: {
		port: PORT,
		env: NODE_ENV,
	},
	mongo: {
		name: DB_NAME,
		port: DB_PORT,
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASS,
	},
}
