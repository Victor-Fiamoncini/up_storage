const FetchPostsRouter = require('../../../src/presentation/routers/FetchPostsRouter')

class FetchPostsUseCase {
	async fetchPosts() {}
}

const makeSut = () => {
	const fetchPostsUseCase = new FetchPostsUseCase()
	const sut = new FetchPostsRouter(fetchPostsUseCase)

	return {
		sut,
		fetchPostsUseCase,
	}
}

describe('FetchPostsRouter', () => {
	it('should return 500 if no httpRequest is provided', async () => {
		const { sut } = makeSut()

		const httpResponse = await sut.route()

		expect(httpResponse.statusCode).toBe(500)
	})

	it('should receive FetchPostsUseCase correctly', async () => {
		const { sut } = makeSut()

		const httpRequest = {}

		await sut.route(httpRequest)

		expect(sut.fetchPostsUseCase).toBeInstanceOf(FetchPostsUseCase)
	})
})
