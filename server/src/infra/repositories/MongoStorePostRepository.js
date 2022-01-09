import StorePostRepository from '@/src/data/repositories/StorePostRepository'

class MongoStorePostRepository extends StorePostRepository {
	constructor(postModel, baseStoreUrl, fileUrlPrefix) {
		super()

		this.postModel = postModel
		this.baseStoreUrl = baseStoreUrl
		this.fileUrlPrefix = fileUrlPrefix
	}

	async store({ originalFileName, fileSize, fileName }) {
		const url = `${this.baseStoreUrl}/${this.fileUrlPrefix}/${fileName}`

		const storedPost = await this.postModel.insertOne({
			name: originalFileName,
			size: fileSize,
			hash_name: fileName,
			url,
		})

		if (storedPost) {
			return {
				id: storedPost.insertedId,
				name: originalFileName,
				size: fileSize,
				hashName: fileName,
				url,
			}
		}

		return null
	}
}

export default MongoStorePostRepository
