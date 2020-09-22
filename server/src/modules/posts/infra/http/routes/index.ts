import { Router } from 'express'

import PostController from '@modules/posts/infra/http/controllers/PostController'

import upload from '@shared/infra/http/middlewares/upload'

const postRouter = Router()

postRouter.get('/', PostController.index)
postRouter.post('/', upload.single('photo'), PostController.store)
postRouter.delete('/:id', PostController.destroy)

export default postRouter
