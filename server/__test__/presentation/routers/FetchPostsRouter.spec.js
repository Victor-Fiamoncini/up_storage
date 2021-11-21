const FetchPostsRouter = require('../../../src/presentation/routers/FetchPostsRouter')

class FetchPostsUseCaseSky {
	async fetchPosts() {}
}

const makeSut = () => {
	const fetchPostsUseCase = new FetchPostsUseCaseSky()

	fetchPostsUseCase.fetchPosts = jest.fn().mockImplementation(() => {})

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

		expect(sut.fetchPostsUseCase).toBeInstanceOf(FetchPostsUseCaseSky)
	})

	it('should return 500 if no FetchPostsUseCase is provided', async () => {
		const sut = new FetchPostsRouter()
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
	})

	it('should return 500 if FetchPostsUseCase has no fetchPosts method', async () => {
		const sut = new FetchPostsRouter({})
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
	})

	it('should call FetchPostsUseCase fetchPosts method correctly', async () => {
		const { sut } = makeSut()
		const httpRequest = {}

		await sut.route(httpRequest)

		expect(sut.fetchPostsUseCase.fetchPosts).toBeCalledTimes(1)
	})
})
