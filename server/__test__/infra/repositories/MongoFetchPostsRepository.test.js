import faker from 'faker'

import MongoFetchPostsRepository from '@/src/infra/repositories/MongoFetchPostsRepository'

const makeSut = returnValue => {
	const postModelSpy = {
		find: jest.fn().mockReturnValueOnce({
			toArray: jest.fn().mockResolvedValueOnce(returnValue),
		}),
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
		const post = {
			_id: faker.datatype.uuid(),
			hash_name: faker.datatype.uuid(),
			name: faker.datatype.uuid(),
			size: faker.datatype.uuid(),
			url: faker.datatype.uuid(),
		}
		db.push(post)

		const posts = await sut.fetchAll()

		expect(posts).toEqual([
			{
				id: post._id,
				name: post.name,
				size: post.size,
				hashName: post.hash_name,
				url: post.url,
			},
		])
	})
})
