import { Router } from 'express'

import PostController from '@modules/posts/infra/http/controllers/PostController'

import upload from '@shared/infra/http/middlewares/upload'

const postRouter = Router()

postRouter.get('/', PostController.findAll)
postRouter.post('/', upload.single('photo'), PostController.create)
postRouter.delete('/:id', PostController.delete)

export default postRouter
