import StorePostRepository from '@/src/data/repositories/StorePostRepository'

class MongoStorePostRepository extends StorePostRepository {
	constructor(postModel) {
		super()

		this.postModel = postModel
	}

	async store(post) {
		const storedPost = await this.postModel.insertOne(post)

		return storedPost ? storedPost : null
	}
}

export default MongoStorePostRepository
