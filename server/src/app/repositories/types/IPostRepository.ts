import { IPost } from '@models/types/IPost'

interface IPostRepository {
	findAll(): Promise<IPost[]>
	create(post: IPost): Promise<IPost>
	delete(id: string): Promise<void>
}

export default IPostRepository
