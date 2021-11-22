const MongoFetchPostsRepository = require('../../../src/infra/repositories/MongoFetchPostsRepository')
const { MongoClient } = require('mongodb')

const makeSut = async () => {
	const client = await MongoClient.connect(' ', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})

	const db = client.db()
	const postModel = db.collection('posts')

	const sut = new MongoFetchPostsRepository(postModel)

	return { sut }
}

describe('MongoFetchPostsRepository', () => {
	it('', async () => {
		const { sut } = await makeSut()
	})
})
