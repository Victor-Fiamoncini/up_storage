import { Router } from 'express'

import postRoutes from '@modules/posts/infra/http/routes'
import userRoutes from '@modules/users/infra/http/routes'

const router = Router()

router.use('/posts', postRoutes)
router.use('/users', userRoutes)

export default router
