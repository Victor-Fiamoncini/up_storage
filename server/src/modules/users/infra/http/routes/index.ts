import { Router } from 'express'

import userRoutes from '@modules/users/infra/http/routes/user.routes'
import sessionRoutes from '@modules/users/infra/http/routes/session.routes'

const router = Router()

router.use('/', userRoutes)
router.use('/sessions', sessionRoutes)

export default router
