import './bootstrap'
import express, { Application } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import { resolve } from 'path'

import routes from './routes'
import Mongo from './config/mongoose'
import error from './app/middlewares/error'

class App {
	private server: Application
	private inProduction: boolean

	constructor() {
		this.server = express()
		this.inProduction = process.env.NODE_ENV === 'production'

		this.database()
		this.middlewares()
		this.static()
	}

	get app(): Application {
		return this.server
	}

	private database(): void {
		new Mongo().connect()
	}

	private middlewares(): void {
		if (this.inProduction) {
			this.server.use(cors({ origin: process.env.CLIENT_WEB_HOST }))
		} else {
			this.server.use(cors({ origin: '*' }))
		}

		this.server.use(helmet())
		this.server.use(express.json())
		this.server.use(morgan('dev'))
		this.server.use(compression())
		this.server.use(routes)
		this.server.use(error)
	}

	private static(): void {
		const filesDir = resolve(__dirname, '..', 'temp', 'uploads')
		const staticUrl = express.static(filesDir)

		this.server.use(`/${process.env.FILE_URL_PREFIX}`, staticUrl)
	}
}

export default new App().app
