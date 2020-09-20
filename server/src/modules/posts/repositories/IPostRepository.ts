import IPostModel from '@modules/posts/models/IPostModel'
import ICreatePostDTO from '@modules/posts/dtos/ICreatePostDTO'

interface IPostRepository {
	findAll(): Promise<IPostModel[]>
	create(data: ICreatePostDTO): Promise<IPostModel>
	delete(id: string): Promise<void>
}

export default IPostRepository
