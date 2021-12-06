import Connection from '@/src/infra/databases/mongo/Connection'
import MongoDeletePostRepository from '@/src/infra/repositories/MongoDeletePostRepository'
import FSFileDeleteAdapter from '@/src/infra/adapters/FSFileDeleteAdapter'
import DeletePostUseCase from '@/src/domain/usecases/DeletePostUseCase'
import DeletePostRouter from '@/src/presentation/routers/DeletePostRouter'
import Env from '@/src/main/config/Env'

class DeletePostRouterFactory {
	static async make() {
		const postModel = await Connection.instance.getCollection('posts')
		const deletePostRepository = new MongoDeletePostRepository(postModel)
		const fileDeleteAdapter = new FSFileDeleteAdapter(Env.app.tempPath)
		const deletePostUseCase = new DeletePostUseCase({
			deletePostRepository,
			fileDeleteAdapter,
		})

		return new DeletePostRouter(deletePostUseCase)
	}
}

export default DeletePostRouterFactory
