import faker from 'faker'
import DeletePostUseCase from '@/src/domain/usecases/DeletePostUseCase'

class DeletePostRepositorySpy {
	async deleteById() {}
}

class DeleteFileAdapterSpy {
	async delete() {}
}

const makeSut = () => {
	const deletePostRepository = new DeletePostRepositorySpy()
	const deleteFileAdapter = new DeleteFileAdapterSpy()
	const sut = new DeletePostUseCase({ deletePostRepository, deleteFileAdapter })

	const params = {
		id: faker.datatype.uuid(),
		hashName: faker.datatype.uuid(),
	}

	return { sut, deletePostRepository, deleteFileAdapter, params }
}

describe('DeletePostUseCase', () => {
	it('should receive deletePostRepository & deleteFileAdapter correctly', async () => {
		const { sut } = makeSut()

		expect(sut.deletePostRepository).toBeInstanceOf(DeletePostRepositorySpy)
		expect(sut.deleteFileAdapter).toBeInstanceOf(DeleteFileAdapterSpy)
	})

	it('should call deletePostRepository correctly', async () => {
		const { sut, deletePostRepository, params } = makeSut()
		deletePostRepository.deleteById = jest.fn(() => null)

		await sut.delete(params)

		expect(sut.deletePostRepository.deleteById).toHaveBeenCalledWith(params.id)
	})

	it('should call deleteFileAdapter correctly', async () => {
		const { sut, deleteFileAdapter, params } = makeSut()
		deleteFileAdapter.delete = jest.fn(() => null)

		await sut.delete(params)

		expect(sut.deleteFileAdapter.delete).toHaveBeenCalledWith(params.hashName)
	})
})
