import faker from 'faker'
import DeletePostUseCase from '@/src/domain/usecases/DeletePostUseCase'

class DeletePostRepositorySpy {
	async deleteById() {}
}

const makeSut = () => {
	const deletePostRepository = new DeletePostRepositorySpy()
	const sut = new DeletePostUseCase(deletePostRepository)

	const params = faker.datatype.uuid()

	return { sut, deletePostRepository, params }
}

describe('DeletePostUseCase', () => {
	it('should receive deletePostRepository correctly', async () => {
		const { sut } = makeSut()

		expect(sut.deletePostRepository).toBeInstanceOf(DeletePostRepositorySpy)
	})

	it('should call deletePostRepository correctly', async () => {
		const { sut, deletePostRepository, params } = makeSut()
		deletePostRepository.deleteById = jest.fn(() => null)

		await sut.delete(params)

		expect(sut.deletePostRepository.deleteById).toHaveBeenCalledWith(params)
	})
})
