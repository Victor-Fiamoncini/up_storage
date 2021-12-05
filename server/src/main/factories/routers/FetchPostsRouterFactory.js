import FetchPostsUseCase from '@/src/domain/usecases/FetchPostsUseCase'
import Connection from '@/src/infra/databases/mongo/Connection'
import MongoFetchPostsRepository from '@/src/infra/repositories/MongoFetchPostsRepository'
import FetchPostsRouter from '@/src/presentation/routers/FetchPostsRouter'

class FetchPostsRouterFactory {
	static async make() {
		const postModel = await Connection.instance.getCollection('posts')
		const fetchPostsRepository = new MongoFetchPostsRepository(postModel)
		const fetchPostsUseCase = new FetchPostsUseCase(fetchPostsRepository)

		return new FetchPostsRouter(fetchPostsUseCase)
	}
}

export default FetchPostsRouterFactory
