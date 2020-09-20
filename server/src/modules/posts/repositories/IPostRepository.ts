import IPost from '@modules/posts/models/IPost'
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'

interface IPostRepository {
	findAll(): Promise<IPost[]>
	create(data: ICreatePostDTO): Promise<IPost>
	delete(id: string): Promise<void>
}

export default IPostRepository
