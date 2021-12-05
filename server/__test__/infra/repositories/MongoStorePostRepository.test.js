import faker from 'faker'
import MongoStorePostRepository from '@/src/infra/repositories/MongoStorePostRepository'

const makeSut = returnValue => {
	const postModelSpy = {
		insertOne: jest.fn().mockResolvedValueOnce(returnValue),
	}
	const sut = new MongoStorePostRepository(postModelSpy)

	const params = {
		fileName: faker.random.alphaNumeric(),
		originalFilename: faker.random.alphaNumeric(),
		fileSize: faker.datatype.number(),
	}

	return { sut, params }
}

describe('MongoStorePostRepository', () => {
	let db = []

	afterEach(() => {
		db = []
	})

	it('should call insertOne with correct params', async () => {
		const { sut, params } = makeSut(db)

		await sut.store(params)

		expect(sut.postModel.insertOne).toHaveBeenCalledWith(params)
	})

	it('should return null if store post failed', async () => {
		const { sut } = makeSut(db)
		sut.postModel.insertOne = jest.fn().mockResolvedValueOnce(null)

		const storedPost = await sut.store()

		expect(storedPost).toEqual(null)
	})

	it('should return the stored post after success', async () => {
		const { sut, params } = makeSut(db)
		const post = { ...params }
		sut.postModel.insertOne = jest.fn().mockImplementationOnce(() => {
			db.push(post)
			return post
		})

		const storedPost = await sut.store(post)

		expect(storedPost).toEqual(post)
		expect(db).toEqual([post])
	})
})
