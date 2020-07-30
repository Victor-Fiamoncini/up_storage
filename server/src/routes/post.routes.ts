import { Router } from 'express'

import PostController from '@controllers/PostController'

import async from '@middlewares/async'
import upload from '@middlewares/upload'

const router = Router()

router.get('/', async(PostController.findAll))
router.post('/', upload.single('photo'), async(PostController.create))
router.delete('/:id', async(PostController.delete))

export default router
