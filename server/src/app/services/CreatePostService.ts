import PostRepository from '../repositories/PostRepository'

class CreatePostService {
	private postRepository: PostRepository

	constructor(postRepository?: PostRepository) {
		this.postRepository = postRepository || new PostRepository()
	}

	async run(name: string, size: number, hashName: string, url?: string) {
		const post = { name, size, hashName, url }

		try {
			return this.postRepository.create(post)
		} catch (err) {
			throw new Error('Erro to create a Post')
		}
	}
}

export default CreatePostService
