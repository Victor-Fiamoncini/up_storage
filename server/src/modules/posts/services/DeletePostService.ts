import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IPostRepository from '@modules/posts/repositories/IPostRepository'

import AppError from '@shared/errors/AppError'

interface IRequest {
	id: string
}

@injectable()
class DeletePostService {
	constructor(
		@inject('PostRepository')
		private postRepository: IPostRepository
	) {}

	public async run({ id }: IRequest) {
		return this.postRepository.delete(id)
	}
}

export default DeletePostService
