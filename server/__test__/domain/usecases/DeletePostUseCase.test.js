import { ObjectID } from 'bson'
import faker from 'faker'

import DeletePostUseCase from '@/src/domain/usecases/DeletePostUseCase'

class DeletePostRepositorySpy {
	async deleteById() {}
}

class FileDeleteAdapterSpy {
	async deleteFile() {}
}

const deletedPost = {
	id: new ObjectID().toString(),
	hashName: faker.datatype.uuid(),
}

const makeSut = () => {
	const deletePostRepository = new DeletePostRepositorySpy()
	const fileDeleteAdapter = new FileDeleteAdapterSpy()
	const sut = new DeletePostUseCase({ deletePostRepository, fileDeleteAdapter })

	const param = faker.datatype.uuid()

	deletePostRepository.deleteById = jest.fn().mockResolvedValue(deletedPost)
	fileDeleteAdapter.deleteFile = jest.fn(() => null)

	return { sut, deletePostRepository, fileDeleteAdapter, param }
}

describe('DeletePostUseCase', () => {
	it('should receive deletePostRepository & fileDeleteAdapter correctly', async () => {
		const { sut } = makeSut()

		expect(sut.deletePostRepository).toBeInstanceOf(DeletePostRepositorySpy)
		expect(sut.fileDeleteAdapter).toBeInstanceOf(FileDeleteAdapterSpy)
	})

	it('should call deletePostRepository correctly', async () => {
		const { sut, param } = makeSut()

		await sut.delete(param)

		expect(sut.deletePostRepository.deleteById).toHaveBeenCalledWith(param)
	})

	it('should call fileDeleteAdapter correctly', async () => {
		const { sut, param } = makeSut()

		await sut.delete(param)

		expect(sut.fileDeleteAdapter.deleteFile).toHaveBeenCalledWith(
			deletedPost.hashName
		)
	})

	it('should not call fileDeleteAdapter when deleteById has no returned the deletedPost', async () => {
		const { sut, deletePostRepository, param } = makeSut()
		deletePostRepository.deleteById = jest.fn().mockResolvedValueOnce(undefined)

		await sut.delete(param)

		expect(sut.fileDeleteAdapter.deleteFile).toHaveBeenCalledTimes(0)
	})
})
