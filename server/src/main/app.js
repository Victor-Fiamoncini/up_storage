import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import Youch from 'youch'

import env from '@/src/main/config/env'
import FetchPostsRouterFactory from '@/src/main/factories/routers/FetchPostsRouterFactory'
import StorePostRouterFactory from '@/src/main/factories/routers/StorePostRouterFactory'
import MulterFileStoreMiddleware from '@/src/factories/middlewares/MulterFileStoreMiddleware'

const app = express()

app.use(cors({ origin: '*' }))
app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))

app.get('/posts', async (req, res) => {
	const fetchPostsRouter = await FetchPostsRouterFactory.make()

	if (!fetchPostsRouter) {
		return res
			.status(500)
			.json(await new Youch('Internal server error', req).toJSON())
	}

	const { statusCode, body } = await fetchPostsRouter.route(req)

	return res.status(statusCode).json(body)
})

app.post(
	'/posts',
	MulterFileStoreMiddleware.storeFile('photo'),
	async (req, res) => {
		const storePostRouter = await StorePostRouterFactory.make()

		if (!storePostRouter) {
			return res
				.status(500)
				.json(await new Youch('Internal server error', req).toJSON())
		}

		const { filename, originalname, size } = req.file

		const httpRequest = {
			fileName: filename,
			originalFileName: originalname,
			fileSize: size,
		}

		const { statusCode, body } = await storePostRouter.route(httpRequest)

		return res.status(statusCode).json(body)
	}
)

app.listen(env.app.port, () =>
	console.log(`Server running at ${env.app.port} ☕️`)
)
