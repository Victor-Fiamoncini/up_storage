import { container } from 'tsyringe'

import '@shared/container/providers'

import IPostRepository from '@modules/posts/repositories/IPostRepository'
import PostRepository from '@modules/posts/infra/mongoose/repositories/PostRepository'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/infra/mongoose/repositories/UserRepository'

container.registerSingleton<IPostRepository>('PostRepository', PostRepository)

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
