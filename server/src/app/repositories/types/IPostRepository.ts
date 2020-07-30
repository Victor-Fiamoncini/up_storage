import { Model } from 'mongoose'
import { IPost } from '../../models/Post'

interface IPostRepository {
	findAll(): Promise<Model<IPost>[]>
	create(post: IPost): Promise<Model<IPost>>
	delete(id: string): Promise<void>
}

export default IPostRepository
