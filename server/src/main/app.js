import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import Youch from 'youch'

import env from '@/src/main/config/env'
import FetchPostsRouterFactory from '@/src/main/factories/routers/FetchPostsRouterFactory'
import StorePostRouterFactory from '@/src/main/factories/routers/StorePostRouterFactory'

const app = express()

app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

app.get('/posts', async (req, res) => {
	const fetchPostsRouter = await FetchPostsRouterFactory.make()

	if (!fetchPostsRouter) {
		const youch = new Youch('Internal server error', req)

		youch.toHTML().then(html => {
			res.writeHead(500, { 'content-type': 'text/html' })
			res.write(html)
			res.end()
		})
	}

	const { statusCode, body } = await fetchPostsRouter.route(req)

	return res.status(statusCode).json(body)
})

app.post('/posts', async (req, res) => {
	const storePostRouter = await StorePostRouterFactory.make()

	if (!storePostRouter) {
		const youch = new Youch('Internal server error', req)

		youch.toHTML().then(html => {
			res.writeHead(500, { 'content-type': 'text/html' })
			res.write(html)
			res.end()
		})
	}

	const { filename, originalname, size } = req.file

	const httpRequest = {
		fileName: filename,
		originalFileName: originalname,
		fileSize: size,
	}

	const { statusCode, body } = await storePostRouter.route(httpRequest)

	return res.status(statusCode).json(body)
})

app.listen(env.app.port, () =>
	console.log(`Server running at ${env.app.port} ☕️`)
)
