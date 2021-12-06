import { resolve } from 'path'
import { config } from 'dotenv'

const rootFolder = resolve(__dirname, '..', '..', '..')

config({ path: resolve(rootFolder, '.env') })

class Env {
	static get app() {
		return {
			url: process.env.APP_URL,
			port: process.env.PORT,
			env: process.env.NODE_ENV,
			fileUrlPrefix: process.env.FILE_URL_PREFIX,
			tempPath: resolve(rootFolder, 'temp'),
		}
	}

	static get mongo() {
		return {
			name: process.env.DB_NAME,
			port: process.env.DB_PORT,
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
		}
	}
}

export default Env
