import { Router } from 'express'

import SessionController from '@modules/users/infra/http/controllers/SessionController'

import SessionValidator from '@modules/users/infra/http/validators/SessionValidator'

const sessionRouter = Router()

sessionRouter.post('/', SessionValidator.create(), SessionController.create)

export default sessionRouter
