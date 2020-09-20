import express, { Application } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import { resolve } from 'path'

import mongoConnect from './app/config/mongoose'
import routes from './routes'
import { error } from './app/middlewares'

class App {
	private readonly server: Application

	constructor() {
		this.server = express()

		mongoConnect()

		this.middlewares()
		this.static()
	}

	get app() {
		return this.server
	}

	private middlewares() {
		const { CLIENT_WEB_HOST, NODE_ENV } = process.env

		if (NODE_ENV !== 'production') {
			this.server.use(cors())
		} else {
			this.server.use(cors({ origin: CLIENT_WEB_HOST }))
			this.server.use(morgan('dev'))
		}

		this.server.use(compression())
		this.server.use(helmet())
		this.server.use(express.json())
		this.server.use(routes)
		this.server.use(error)
	}

	private static() {
		const pathPrefix = `/${process.env.FILE_URL_PREFIX}`

		const staticUrl = express.static(
			resolve(__dirname, '..', 'temp', 'uploads')
		)

		this.server.use(pathPrefix, staticUrl)
	}
}

export default new App().app
