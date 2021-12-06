import faker from 'faker'
import ServerError from '@/src/presentation/errors/ServerError'
import DeletePostRouter from '@/src/presentation/routers/DeletePostRouter'

class DeletePostUseCaseSpy {
	async delete() {}
}

const makeSut = () => {
	const deletePostUseCase = new DeletePostUseCaseSpy()
	const sut = new DeletePostRouter(deletePostUseCase)

	const httpRequest = {
		id: faker.datatype.uuid(),
	}

	return {
		sut,
		deletePostUseCase,
		httpRequest,
	}
}

describe('DeletePostRouter', () => {
	it('should return 500 if no httpRequest is provided', async () => {
		const { sut } = makeSut()

		const httpResponse = await sut.route()

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should receive DeletePostUseCase correctly', async () => {
		const { sut } = makeSut()
		const httpRequest = {}

		await sut.route(httpRequest)

		expect(sut.deletePostUseCase).toBeInstanceOf(DeletePostUseCaseSpy)
	})

	it('should return 500 if no DeletePostUseCase is provided', async () => {
		const sut = new DeletePostRouter()
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should return 500 if DeletePostUseCase has no delete method', async () => {
		const sut = new DeletePostRouter({})
		const httpRequest = {}

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should call DeletePostUseCase delete method correctly', async () => {
		const { sut, deletePostUseCase, httpRequest } = makeSut()
		deletePostUseCase.delete = jest.fn(() => null)

		await sut.route(httpRequest)

		expect(sut.deletePostUseCase.delete).toBeCalledTimes(1)
	})

	it('should pass httpRequest to delete method with correct params', async () => {
		const { sut, deletePostUseCase, httpRequest } = makeSut()
		deletePostUseCase.delete = jest.fn(() => null)

		await sut.route(httpRequest)

		expect(sut.deletePostUseCase.delete).toHaveBeenCalledWith(httpRequest.id)
	})

	it('should throw if some required parameter is not passed in httpRequest', async () => {
		const { sut, deletePostUseCase } = makeSut()
		const httpRequest = {}
		deletePostUseCase.delete = jest.fn(() => null)

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
		expect(httpResponse.body).toBeInstanceOf(ServerError)
	})

	it('should return no-content status after successfull post delete', async () => {
		const { sut, deletePostUseCase, httpRequest } = makeSut()
		deletePostUseCase.delete = jest.fn(() => null)

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(204)
	})
})
