const faker = require('faker')
const MongoFetchPostsRepository = require('../../../src/infra/repositories/MongoFetchPostsRepository')

const makeSut = returnValue => {
	const postModelSpy = {
		find: jest.fn().mockResolvedValueOnce(returnValue),
	}
	const sut = new MongoFetchPostsRepository(postModelSpy)

	return { sut }
}

describe('MongoFetchPostsRepository', () => {
	let db = []

	afterEach(() => {
		db = []
	})

	it('should return an empty array if no posts found', async () => {
		const { sut } = makeSut(db)

		const posts = await sut.fetchAll()

		expect(posts).toEqual([])
	})

	it('should return an empty array if returns undefined', async () => {
		const { sut } = makeSut(undefined)

		const posts = await sut.fetchAll()

		expect(posts).toEqual([])
	})

	it('should return a list of posts if finded', async () => {
		const { sut } = makeSut(db)
		const post = { id: faker.datatype.uuid() }
		db.push(post)

		const posts = await sut.fetchAll()

		expect(posts).toEqual([post])
	})
})
