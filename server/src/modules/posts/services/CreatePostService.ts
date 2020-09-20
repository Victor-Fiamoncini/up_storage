import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IPostRepository from '@modules/posts/repositories/IPostRepository'

interface IRequest {
	name: string
	hash_name: string
	size: number
}

@injectable()
class CreatePostService {
	constructor(
		@inject('PostRepository')
		private postRepository: IPostRepository
	) {}

	public async run({ name, hash_name, size }: IRequest) {
		return this.postRepository.create({ name, hash_name, size })
	}
}

export default CreatePostService
