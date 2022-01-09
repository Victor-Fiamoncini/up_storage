import FetchPostsRepository from '@/src/data/repositories/FetchPostsRepository'

class MongoFetchPostsRepository extends FetchPostsRepository {
	constructor(postModel) {
		super()

		this.postModel = postModel
	}

	async fetchAll() {
		const posts = await this.postModel.find().toArray()

		if (Array.isArray(posts) && posts.length) {
			return posts.map(post => ({
				id: post._id,
				name: post.name,
				size: post.size,
				hashName: post.hash_name,
				url: post.url,
			}))
		}

		return []
	}
}

export default MongoFetchPostsRepository
