import FetchPostsRepository from '@/src/data/repositories/FetchPostsRepository'

class MongoFetchPostsRepository extends FetchPostsRepository {
	constructor(postModel) {
		super()

		this.postModel = postModel
	}

	async fetchAll() {
		const posts = await this.postModel.find()

		return posts ? posts : []
	}
}

export default MongoFetchPostsRepository
