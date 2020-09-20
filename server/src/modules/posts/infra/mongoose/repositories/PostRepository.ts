import Post from '@modules/posts/infra/mongoose/models/Post'

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'
import IPostRepository from '@modules/posts/repositories/IPostRepository'

class PostRepository implements IPostRepository {
	private readonly model = Post

	public async findAll() {
		return this.model.find().sort('-createdAt')
	}

	public async create({ name, hash_name, size, url }: ICreatePostDTO) {
		return this.model.create({ name, hash_name, size, url })
	}

	public async delete(id: string) {
		await this.model.deleteOne({ _id: id })
	}
}

export default PostRepository
