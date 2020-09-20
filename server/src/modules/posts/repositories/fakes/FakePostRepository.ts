import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'
import IPost from '@modules/posts/models/IPost'
import IPostRepository from '@modules/posts/repositories/IPostRepository'

class FakePostRepository implements IPostRepository {
	private posts: IPost[] = []

	public async findAll() {
		return this.posts
	}

	public async create({ name, hash_name, size, url }: ICreatePostDTO) {
		this.posts.push({
			name,
			hash_name,
			size,
			url,
		})

		return {
			name,
			hash_name,
			size,
			url,
		}
	}

	public async delete(id: string) {
		const postIndexToDelete = this.posts.findIndex(post => post._id === id)

		this.posts.slice(postIndexToDelete, 1)
	}
}

export default FakePostRepository
