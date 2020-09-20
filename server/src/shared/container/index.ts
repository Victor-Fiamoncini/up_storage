import { container } from 'tsyringe'

import IPostRepository from '@modules/posts/repositories/IPostRepository'
import PostRepository from '@modules/posts/infra/mongoose/repositories/PostRepository'

container.registerSingleton<IPostRepository>('PostRepository', PostRepository)
