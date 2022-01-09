import { ObjectId } from 'mongodb'

import DeletePostRepository from '@/src/data/repositories/DeletePostRepository'

class MongoDeletePostRepository extends DeletePostRepository {
	constructor(postModel) {
		super()

		this.postModel = postModel
	}

	async deleteById(id) {
		const deletedPost = await this.postModel.findOneAndDelete({
			_id: new ObjectId(id),
		})

		if (deletedPost?.value) {
			return {
				id: deletedPost.value?._id,
				hashName: deletedPost.value?.hash_name,
			}
		}
	}
}

export default MongoDeletePostRepository
