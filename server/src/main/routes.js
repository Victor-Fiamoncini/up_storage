import { Router } from 'express'

import FetchPostsRouterFactory from '@/src/main/factories/routers/FetchPostsRouterFactory'
import StorePostRouterFactory from '@/src/main/factories/routers/StorePostRouterFactory'
import FileStoreAdapterFactory from '@/src/main/factories/adapters/FileStoreAdapterFactory'
import DeletePostRouterFactory from '@/src/main/factories/routers/DeletePostRouterFactory'
import UnexpectedError from '@/src/main/errors/UnexpectedError'

const router = Router()

router.get('/posts', async (req, res) => {
	let fetchPostsRouter

	try {
		fetchPostsRouter = await FetchPostsRouterFactory.make()
	} catch {
		return res.status(500).json(new UnexpectedError())
	}

	const { statusCode, body } = await fetchPostsRouter.route(req)

	return res.status(statusCode).json(body)
})

router.post(
	'/posts',
	FileStoreAdapterFactory.make().storeFile('photo'),
	async (req, res) => {
		let storePostRouter

		try {
			storePostRouter = await StorePostRouterFactory.make()
		} catch {
			return res.status(500).json(new UnexpectedError())
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

router.delete('/posts/:id', async (req, res) => {
	let deletePostRouter

	try {
		deletePostRouter = await DeletePostRouterFactory.make()
	} catch {
		return res.status(500).json(new UnexpectedError())
	}

	const httpRequest = {
		id: req.params.id,
	}

	const { statusCode } = await deletePostRouter.route(httpRequest)

	return res.status(statusCode).json()
})

router.use((err, req, res, next) => {
	return res.status(500).send(new UnexpectedError())
})

export default router
