import { Router } from 'express'

import PostController from '@modules/posts/infra/http/controllers/PostController'

import upload from '@shared/infra/http/middlewares/upload'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const postRouter = Router()

postRouter.use(ensureAuthenticated)

postRouter.get('/', PostController.findAll)
postRouter.post('/', upload.single('photo'), PostController.create)
postRouter.delete('/:id', PostController.delete)

export default postRouter
