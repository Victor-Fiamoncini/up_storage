import faker from 'faker'
import MongoStorePostRepository from '@/src/infra/repositories/MongoStorePostRepository'

const makeSut = returnValue => {
	const postModelSpy = {
		insertOne: jest.fn().mockResolvedValueOnce(returnValue),
	}
	const sut = new MongoStorePostRepository(
		postModelSpy,
		faker.internet.url(),
		faker.random.word()
	)

	const params = {
		fileName: faker.random.alphaNumeric(),
		originalFileName: faker.random.alphaNumeric(),
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

		expect(sut.postModel.insertOne).toHaveBeenCalledWith({
			name: params.originalFileName,
			size: params.fileSize,
			hash_name: params.fileName,
			url: `${sut.baseStoreUrl}/${sut.fileUrlPrefix}/${params.fileName}`,
		})
	})

	it('should return null if store post failed', async () => {
		const { sut, params } = makeSut(db)
		sut.postModel.insertOne = jest.fn().mockResolvedValueOnce(null)

		const storedPost = await sut.store(params)

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
