import { Model } from 'mongoose'

import { IPostDocument, IPost } from '../models/Post'
import IPostRepository from './types/IPostRepository'

class PostRepository implements IPostRepository {
	async findAll(): Promise<Model<IPostDocument, {}>[]> {
		throw new Error('Method not implemented.')
	}

	async create(post: IPost): Promise<Model<IPostDocument, {}>> {
		throw new Error('Method not implemented.')
	}

	async delete(id: string): Promise<void> {
		throw new Error('Method not implemented.')
	}
}

export default PostRepository
