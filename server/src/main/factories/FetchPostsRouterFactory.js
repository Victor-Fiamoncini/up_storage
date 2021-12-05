const FetchPostsUseCase = require('../../domain/usecases/FetchPostsUseCase')
const Connection = require('../../infra/databases/mongo/Connection')
const MongoFetchPostsRepository = require('../../infra/repositories/MongoFetchPostsRepository')
const FetchPostsRouter = require('../../presentation/routers/FetchPostsRouter')

async function makeFetchPostsRouter() {
	try {
		const postModel = await Connection.instance.getCollection('posts')
		const fetchPostsRepository = new MongoFetchPostsRepository(postModel)
		const fetchPostsUseCase = new FetchPostsUseCase(fetchPostsRepository)

		return new FetchPostsRouter(fetchPostsUseCase)
	} catch {
		throw new Error('Error to create FetchPostsRouter')
	}
}

module.exports = makeFetchPostsRouter
