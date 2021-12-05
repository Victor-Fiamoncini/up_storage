import { Collection, Db, MongoClient } from 'mongodb'

import Connection from '@/src/infra/databases/mongo/Connection'

const makeSut = () => {
	const sut = Connection.instance

	return { sut }
}

describe('Connection', () => {
	it('should connect successfully', async () => {
		const { sut } = makeSut()

		await sut.connect()

		expect(sut.client).toBeTruthy()
		expect(sut.database).toBeTruthy()
		expect(sut.client).toBeInstanceOf(MongoClient)
		expect(sut.database).toBeInstanceOf(Db)

		await sut.disconnect()
	})

	it('should disconnect successfully', async () => {
		const { sut } = makeSut()

		await sut.connect()

		expect(sut.client).toBeTruthy()
		expect(sut.database).toBeTruthy()
		expect(sut.client).toBeInstanceOf(MongoClient)
		expect(sut.database).toBeInstanceOf(Db)

		await sut.disconnect()

		expect(sut.client).toBeFalsy()
		expect(sut.database).toBeFalsy()
	})

	it('should return "posts" collection when getCollection method is called', async () => {
		const { sut } = makeSut()

		const postsCollection = await sut.getCollection('posts')

		expect(postsCollection).toBeTruthy()
		expect(postsCollection).toBeInstanceOf(Collection)

		await sut.disconnect()
	})

	it('should return "posts" collection when getCollection is called with disconnected client', async () => {
		const { sut } = makeSut()

		await sut.connect()
		await sut.disconnect()

		const postsCollection = await sut.getCollection('posts')

		expect(postsCollection).toBeTruthy()
		expect(postsCollection).toBeInstanceOf(Collection)

		await sut.disconnect()
	})
})
