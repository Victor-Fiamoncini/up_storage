import { v4 as uuid } from 'uuid'

import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'
import IPostModel from '@modules/posts/models/IPostModel'
import IPostRepository from '@modules/posts/repositories/IPostRepository'

class FakePostRepository implements IPostRepository {
	private posts: IPostModel[] = []

	public async findAll() {
		return this.posts
	}

	public async findById(id: string) {
		const post = this.posts.find(post => post._id === id)

		return post || null
	}

	public async create({ name, hash_name, size }: ICreatePostDTO) {
		const _id = uuid()
		const url = ''

		this.posts.push({
			_id,
			name,
			hash_name,
			size,
			url,
		})

		return {
			_id,
			name,
			hash_name,
			size,
			url,
		}
	}

	public async delete(id: string) {
		const postIndexToDelete = this.posts.findIndex(post => post._id === id)

		if (postIndexToDelete === -1) {
			return null
		}

		this.posts.splice(postIndexToDelete, 1)
	}
}

export default FakePostRepository
