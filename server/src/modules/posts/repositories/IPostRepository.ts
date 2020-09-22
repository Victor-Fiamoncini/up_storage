import IPostModel from '@modules/posts/models/IPostModel'
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'

interface IPostRepository {
	findAll(): Promise<IPostModel[]>
	findById(id: string): Promise<IPostModel | null>
	create(data: ICreatePostDTO): Promise<IPostModel>
	delete(id: string): Promise<void | null>
}

export default IPostRepository
