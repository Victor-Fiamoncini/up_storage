import faker from 'faker'
import StorePostUseCase from '@/src/domain/usecases/StorePostUseCase'

class StorePostRepositorySpy {
	async store() {}
}

const makeSut = () => {
	const storePostRepository = new StorePostRepositorySpy()
	const sut = new StorePostUseCase(storePostRepository)

	const params = {
		fileName: faker.random.alphaNumeric(),
		originalFileName: faker.random.alphaNumeric(),
		fileSize: faker.datatype.number(),
	}

	return { sut, storePostRepository, params }
}

describe('StorePostUseCase', () => {
	it('should receive StorePostRepository correctly', async () => {
		const { sut } = makeSut()

		expect(sut.storePostRepository).toBeInstanceOf(StorePostRepositorySpy)
	})

	it('should call StorePostRepository correctly', async () => {
		const { sut, storePostRepository, params } = makeSut()
		storePostRepository.store = jest.fn(() => null)

		await sut.store(params)

		expect(sut.storePostRepository.store).toHaveBeenCalledWith(params)
	})

	it('should return null if store returns null', async () => {
		const { sut, storePostRepository, params } = makeSut()
		storePostRepository.store = jest.fn().mockResolvedValueOnce(null)

		const promise = sut.store(params)

		await expect(promise).resolves.toBe(null)
	})
})
