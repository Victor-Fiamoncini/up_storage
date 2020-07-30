import IPostRepository from '@repositories/types/IPostRepository'
import { IPost } from '@models/types/IPost'
import Post from '@models/Post'

class PostRepository implements IPostRepository {
	async findAll(): Promise<IPost[]> {
		throw new Error('Method not implemented.')
	}

	async create(post: IPost): Promise<IPost> {
		return await new Post(post).save()
	}

	async delete(id: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
}

export default PostRepository
