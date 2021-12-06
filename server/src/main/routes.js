import { Router } from 'express'

import FetchPostsRouterFactory from '@/src/main/factories/routers/FetchPostsRouterFactory'
import StorePostRouterFactory from '@/src/main/factories/routers/StorePostRouterFactory'
import FileStoreAdapterFactory from '@/src/main/factories/adapters/FileStoreAdapterFactory'
import DeletePostRouterFactory from './factories/routers/DeletePostRouterFactory'

const router = Router()

router.get('/posts', async (req, res) => {
	const fetchPostsRouter = await FetchPostsRouterFactory.make()

	const { statusCode, body } = await fetchPostsRouter.route(req)

	return res.status(statusCode).json(body)
})

router.post(
	'/posts',
	FileStoreAdapterFactory.make().storeFile('photo'),
	async (req, res) => {
		const storePostRouter = await StorePostRouterFactory.make()

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

router.delete('/posts/:id', async (req, res) => {
	const deletePostRouter = await DeletePostRouterFactory.make()

	const httpRequest = {
		id: req.params.id,
	}

	const { statusCode } = await deletePostRouter.route(httpRequest)

	return res.status(statusCode)
})

export default router
