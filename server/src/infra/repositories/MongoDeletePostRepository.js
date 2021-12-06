import DeletePostRepository from '@/src/data/repositories/DeletePostRepository'

class MongoDeletePostRepository extends DeletePostRepository {
	constructor(postModel) {
		super()

		this.postModel = postModel
	}

	async deleteById(id) {
		await this.postModel.deleteOne({ _id: id })
	}
}

export default MongoDeletePostRepository
