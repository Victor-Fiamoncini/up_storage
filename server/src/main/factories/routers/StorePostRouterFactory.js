import StorePostUseCase from '@/src/domain/usecases/StorePostUseCase'
import Connection from '@/src/infra/databases/mongo/Connection'
import MongoStorePostRepository from '@/src/infra/repositories/MongoStorePostRepository'
import StorePostRouter from '@/src/presentation/routers/StorePostRouter'
import Env from '@/src/main/config/Env'

class StorePostRouterFactory {
	static async make() {
		const postModel = await Connection.instance.getCollection('posts')
		const storePostRepository = new MongoStorePostRepository(
			postModel,
			Env.app.url,
			Env.app.fileUrlPrefix
		)
		const storePostUseCase = new StorePostUseCase(storePostRepository)

		return new StorePostRouter(storePostUseCase)
	}
}

export default StorePostRouterFactory
