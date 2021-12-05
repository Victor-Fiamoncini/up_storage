import { resolve } from 'path'
import { config } from 'dotenv'

config({ path: resolve(__dirname, '..', '..', '..', '.env') })

const {
	APP_URL,
	NODE_ENV,
	PORT,
	FILE_URL_PREFIX,
	DB_NAME,
	DB_PORT,
	DB_HOST,
	DB_USER,
	DB_PASS,
} = process.env

export default {
	app: {
		url: APP_URL,
		port: PORT,
		env: NODE_ENV,
		fileUrlPrefix: FILE_URL_PREFIX,
	},
	mongo: {
		name: DB_NAME,
		port: DB_PORT,
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASS,
	},
}
