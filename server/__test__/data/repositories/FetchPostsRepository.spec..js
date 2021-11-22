const FetchPostsRepository = require('../../../src/data/repositories/FetchPostsRepository')

const makeSut = () => {
	const sut = new FetchPostsRepository()

	return { sut }
}

describe('FetchPostsRepository', () => {
	it('should receive FetchPostsRepository correctly', async () => {
		const { sut } = makeSut()
	})
})
