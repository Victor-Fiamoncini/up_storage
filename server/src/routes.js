import { Router } from 'express'

import * as controllers from './app/controllers'
import * as middlewares from './app/middlewares'

const router = Router()

/**
 * Public posts
 */
router.post(
	'/posts',
	middlewares.upload.single('photo'),
	middlewares.async(controllers.PostController.store)
)

export default router
