import './bootstrap'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import { resolve } from 'path'

import routes from './routes'
import mongoose from './config/mongoose'
import error from './app/middlewares/error'

class App {
	constructor() {
		this.server = express()

		this.configs()
		this.database()
		this.middlewares()
		this.static()
	}

	get app() {
		return this.server
	}

	configs() {
		this.server.disable('x-powered-by')
		this.inProduction = process.env.NODE_ENV === 'production'
	}

	database() {
		mongoose()
	}

	middlewares() {
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

	static() {
		const filesDir = resolve(__dirname, '..', 'temp', 'uploads')
		const staticUrl = express.static(filesDir)

		this.server.use(`/${process.env.FILE_URL_PREFIX}`, staticUrl)
	}
}

export default new App().app
