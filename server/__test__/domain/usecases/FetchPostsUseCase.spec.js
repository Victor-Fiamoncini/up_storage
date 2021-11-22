const FetchPostsUseCase = require('../../../src/domain/usecases/FetchPostsUseCase')

class FetchPostsRepositorySky {
	async fetchAll() {}
}

const makeSut = () => {
	const fetchPostsRepository = new FetchPostsRepositorySky()
	const sut = new FetchPostsUseCase(fetchPostsRepository)

	return { sut, fetchPostsRepository }
}

describe('FetchPostsUseCase', () => {
	it('should receive FetchPostsRepository correctly', async () => {
		const { sut } = makeSut()

		expect(sut.fetchPostsRepository).toBeInstanceOf(FetchPostsRepositorySky)
	})

	it('should call FetchPostsRepository correctly', async () => {
		const { sut, fetchPostsRepository } = makeSut()
		fetchPostsRepository.fetchAll = jest.fn().mockImplementationOnce(() => {})

		await sut.fetchPosts()

		expect(sut.fetchPostsRepository.fetchAll).toBeCalledTimes(1)
	})
})
