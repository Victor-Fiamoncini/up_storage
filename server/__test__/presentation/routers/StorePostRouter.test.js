import faker from 'faker'
import ServerError from '@/src/presentation/errors/ServerError'
import StorePostRouter from '@/src/presentation/routers/StorePostRouter'

class StorePostUseCaseSpy {
	async store() {}
}

const makeSut = () => {
	const storePostUseCase = new StorePostUseCaseSpy()
	const sut = new StorePostRouter(storePostUseCase)

	const httpRequest = {
		fileName: faker.random.alphaNumeric(),
		originalFileName: faker.random.alphaNumeric(),
		fileSize: faker.datatype.number(),
	}

	return {
		sut,
		storePostUseCase,
		httpRequest,
	}
}

describe('StorePostRouter', () => {
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

		expect(sut.storePostUseCase).toBeInstanceOf(StorePostUseCaseSpy)
	})

	it('should return 500 if no StorePostUseCase is provided', async () => {
		const sut = new StorePostRouter()
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should return 500 if StorePostUseCase has no store method', async () => {
		const sut = new StorePostRouter({})
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should call StorePostUseCase store method correctly', async () => {
		const { sut, storePostUseCase, httpRequest } = makeSut()
		storePostUseCase.store = jest.fn(() => null)

		await sut.route(httpRequest)

		expect(sut.storePostUseCase.store).toBeCalledTimes(1)
	})

	it('should pass httpRequest to store method with correct params', async () => {
		const { sut, storePostUseCase, httpRequest } = makeSut()
		storePostUseCase.store = jest.fn(() => null)

		await sut.route(httpRequest)

		expect(sut.storePostUseCase.store).toHaveBeenCalledWith(httpRequest)
	})

	it('should throw if some required parameter is not passed in httpRequest', async () => {
		const { sut, storePostUseCase } = makeSut()
		const httpRequest = { fileName: faker.random.alphaNumeric() }
		storePostUseCase.store = jest.fn(() => null)

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})
})
