import FetchPostsUseCase from '@/src/domain/usecases/FetchPostsUseCase'

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

	it('should return an empty array if fetchPosts returns an empty array', async () => {
		const { sut, fetchPostsRepository } = makeSut()
		fetchPostsRepository.fetchAll = jest.fn().mockResolvedValueOnce([])

		const posts = await sut.fetchPosts()

		expect(posts).toEqual([])
	})

	it('should return an empty array if fetchPosts returns null', async () => {
		const { sut, fetchPostsRepository } = makeSut()
		fetchPostsRepository.fetchAll = jest.fn().mockResolvedValueOnce(null)

		const posts = await sut.fetchPosts()

		expect(posts).toEqual([])
	})
})
