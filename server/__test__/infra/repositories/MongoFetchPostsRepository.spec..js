const MongoFetchPostsRepository = require('../../../src/infra/repositories/MongoFetchPostsRepository')
const { MongoClient } = require('mongodb')

const makeSut = async db => {
	const postModel = db.collection('posts')
	const sut = new MongoFetchPostsRepository(postModel)

	return { sut }
}

describe('MongoFetchPostsRepository', () => {
	let connection, db

	beforeAll(async () => {
		connection = await MongoClient.connect(global.__MONGO_URI__, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})

		db = connection.db()
	})

	afterAll(async () => {
		await connection.close()
	})

	it('', async () => {
		const { sut } = await makeSut(db)
	})
})
