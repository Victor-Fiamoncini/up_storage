import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { resolve } from 'path'

import mongoConnect from './app/config/mongoose'
import routes from './routes'
import { error } from './app/middlewares'

export default class App {
	constructor() {
		this.express = express()

		this.configs()
		this.database()
		this.middlewares()
		this.static()
		this.routes()
	}

	get app() {
		return this.express
	}

	configs() {
		this.express.disable('x-powered-by')
	}

	middlewares() {
		const { CLIENT_WEB_HOST, NODE_ENV } = process.env

		if (NODE_ENV !== 'production') {
			this.express.use(cors({ origin: '*' }))
		} else {
			this.express.use(cors({ origin: CLIENT_WEB_HOST }))
		}

		this.express.use(helmet())
		this.express.use(express.json())
		this.express.use(morgan('dev'))
	}

	static() {
		const pathPrefix = `/${process.env.FILE_URL_PREFIX}`
		const staticUrl = express.static(
			resolve(__dirname, '..', 'temp', 'uploads')
		)

		this.express.use(pathPrefix, staticUrl)
	}

	routes() {
		this.express.use(routes)
		this.express.use(error)
	}

	database() {
		mongoConnect()
	}
}
