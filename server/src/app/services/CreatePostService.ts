import PostRepository from '@repositories/PostRepository'
import { IPost } from '@models/types/IPost'

class CreatePostService {
	private postRepository: PostRepository

	constructor(postRepository?: PostRepository) {
		this.postRepository = postRepository || new PostRepository()
	}

	async run({ name, size, hashName, url }: IPost) {
		try {
			return this.postRepository.create({ name, size, hashName, url })
		} catch (err) {
			throw new Error('Error to create a Post')
		}
	}
}

export default CreatePostService
