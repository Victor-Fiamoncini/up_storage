const ServerError = require('../../../src/presentation/errors/ServerError')
const FetchPostsRouter = require('../../../src/presentation/routers/FetchPostsRouter')

class FetchPostsUseCaseSpy {
	async fetchPosts() {}
}

const makeSut = () => {
	const fetchPostsUseCase = new FetchPostsUseCaseSpy()
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
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should receive FetchPostsUseCase correctly', async () => {
		const { sut } = makeSut()
		const httpRequest = {}

		await sut.route(httpRequest)

		expect(sut.fetchPostsUseCase).toBeInstanceOf(FetchPostsUseCaseSpy)
	})

	it('should return 500 if no FetchPostsUseCase is provided', async () => {
		const sut = new FetchPostsRouter()
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should return 500 if FetchPostsUseCase has no fetchPosts method', async () => {
		const sut = new FetchPostsRouter({})
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should call FetchPostsUseCase fetchPosts method correctly', async () => {
		const { sut, fetchPostsUseCase } = makeSut()
		const httpRequest = {}
		fetchPostsUseCase.fetchPosts = jest.fn().mockImplementationOnce(() => [])

		await sut.route(httpRequest)

		expect(sut.fetchPostsUseCase.fetchPosts).toBeCalledTimes(1)
	})

	it('should return 200 if all dependencies are called correctly', async () => {
		const { sut, fetchPostsUseCase } = makeSut()
		const httpRequest = {}
		fetchPostsUseCase.fetchPosts = jest.fn().mockImplementationOnce(() => [])

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(200)
		expect(httpResponse.body).toEqual([])
	})

	it('should return 500 if FetchPostsUseCase throws', async () => {
		const { sut } = makeSut()
		const httpRequest = {}
		sut.fetchPostsUseCase.fetchPosts = jest
			.fn()
			.mockRejectedValueOnce('any_error')

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})
})
