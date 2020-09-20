import { Router } from 'express'

import PostController from '../../../../modules/posts/infra/http/controllers/PostController'

import upload from '../middlewares/upload'

const router = Router()

router.get('/posts', PostController.index)

router.post('/posts', upload.single('photo'), PostController.store)

router.delete('/posts/:id', PostController.destroy)

export default router
