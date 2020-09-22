import { Router } from 'express'

import UserController from '@modules/users/infra/http/controllers/UserController'

const userRouter = Router()

userRouter.post('/', UserController.store)

export default userRouter
