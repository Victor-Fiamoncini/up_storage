import 'reflect-metadata'
import 'dotenv/config'
import express, { Application } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import { errors } from 'celebrate'

import '@shared/container'

import MongooseConnection from '@config/mongo'
import routes from '@shared/infra/http/routes'
import errorHandler from '@shared/infra/http/middlewares/errorHandler'
import uploadConfig from '@config/upload'

class App {
	private readonly server: Application
	private readonly inProduction: boolean

	constructor() {
		this.server = express()
		this.inProduction = process.env.NODE_ENV === 'production'

		MongooseConnection.connect()

		this.middlewares()
	}

	get app() {
		return this.server
	}

	private middlewares() {
		if (!this.inProduction) {
			this.server.use(morgan('dev'))
		}

		const pathPrefix = `/${process.env.FILE_URL_PREFIX}`

		this.server.use(compression())
		this.server.use(cors())
		this.server.use(helmet())
		this.server.use(express.json())
		this.server.use(routes)
		this.server.use(pathPrefix, express.static(uploadConfig.pathToTemp))
		this.server.use(errors())
		this.server.use(errorHandler)
	}
}

export default new App().app
