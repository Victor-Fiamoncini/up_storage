import Post from '@modules/posts/infra/mongoose/models/Post'

import IPostRepository from '@modules/posts/repositories/IPostRepository'

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'

class PostRepository implements IPostRepository {
	private readonly model = Post

	public async findAll() {
		return this.model.find().sort('-createdAt')
	}

	public async findById(id: string) {
		return this.model.findById(id)
	}

	public async create({ name, hash_name, size }: ICreatePostDTO) {
		return this.model.create({ name, hash_name, size })
	}

	public async delete(id: string) {
		await this.model.deleteOne({ _id: id })
	}
}

export default PostRepository
