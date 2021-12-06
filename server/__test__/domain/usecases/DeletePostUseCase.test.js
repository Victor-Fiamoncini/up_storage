import faker from 'faker'
import DeletePostUseCase from '@/src/domain/usecases/DeletePostUseCase'

class DeletePostRepositorySpy {
	async deleteById() {}
}

class FileDeleteAdapterSpy {
	async deleteFile() {}
}

const makeSut = () => {
	const deletePostRepository = new DeletePostRepositorySpy()
	const fileDeleteAdapter = new FileDeleteAdapterSpy()
	const sut = new DeletePostUseCase({ deletePostRepository, fileDeleteAdapter })

	const params = {
		id: faker.datatype.uuid(),
		hashName: faker.datatype.uuid(),
	}

	return { sut, deletePostRepository, fileDeleteAdapter, params }
}

describe('DeletePostUseCase', () => {
	it('should receive deletePostRepository & fileDeleteAdapter correctly', async () => {
		const { sut } = makeSut()

		expect(sut.deletePostRepository).toBeInstanceOf(DeletePostRepositorySpy)
		expect(sut.fileDeleteAdapter).toBeInstanceOf(FileDeleteAdapterSpy)
	})

	it('should call deletePostRepository correctly', async () => {
		const { sut, deletePostRepository, params } = makeSut()
		deletePostRepository.deleteById = jest.fn(() => null)

		await sut.delete(params)

		expect(sut.deletePostRepository.deleteById).toHaveBeenCalledWith(params.id)
	})

	it('should call fileDeleteAdapter correctly', async () => {
		const { sut, fileDeleteAdapter, params } = makeSut()
		fileDeleteAdapter.deleteFile = jest.fn(() => null)

		await sut.delete(params)

		expect(sut.fileDeleteAdapter.deleteFile).toHaveBeenCalledWith(
			params.hashName
		)
	})
})
