import StorePostUseCase from '@/src/domain/usecases/StorePostUseCase'
import Connection from '@/src/infra/databases/mongo/Connection'
import MongoStorePostRepository from '@/src/infra/repositories/MongoStorePostRepository'
import StorePostRouter from '@/src/presentation/routers/StorePostRouter'
import env from '@/src/main/config/env'

class StorePostRouterFactory {
	static async make() {
		try {
			const postModel = await Connection.instance.getCollection('posts')
			const storePostRepository = new MongoStorePostRepository(
				postModel,
				env.app.url,
				env.app.fileUrlPrefix
			)
			const storePostUseCase = new StorePostUseCase(storePostRepository)

			return new StorePostRouter(storePostUseCase)
		} catch {
			return null
		}
	}
}

export default StorePostRouterFactory
