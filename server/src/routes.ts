import { Router } from 'express'

import PostController from './app/controllers/PostController'

import async from './app/middlewares/async'
import upload from './app/middlewares/upload'

const router = Router()

router.get('/posts', async(PostController.index))
// router.post('/posts', upload.single('photo'), async(PostController.store))
// router.delete('/posts/:id', async(PostController.destroy))

export default router
