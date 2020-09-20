import { Router } from 'express'

import postRoutes from '@modules/posts/infra/http/routes'

const router = Router()

router.use(postRoutes)

export default router
