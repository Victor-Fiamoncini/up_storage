const FetchPostsRepository = require('../../data/repositories/FetchPostsRepository')

class MongoFetchPostsRepository extends FetchPostsRepository {
	constructor(postModel) {
		super()

		this.postModel = postModel
	}

	async fetchAll() {
		return this.postModel.find()
	}
}

module.exports = MongoFetchPostsRepository
