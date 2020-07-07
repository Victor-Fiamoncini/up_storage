import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'

const router = Router()

/**
 * Public posts
 */
router.get('/posts', middlewares.async(controllers.PostController.index))
router.post(
	'/posts',
	middlewares.upload.single('photo'),
	middlewares.async(controllers.PostController.store)
)
router.delete(
	'/posts/:id',
	middlewares.async(controllers.PostController.destroy)
)

export default router
