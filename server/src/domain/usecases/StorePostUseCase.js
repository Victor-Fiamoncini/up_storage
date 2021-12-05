class StorePostUseCase {
	constructor(storePostRepository) {
		this.storePostRepository = storePostRepository
	}

	async store({ fileName, originalFilename, fileSize }) {
		const post = await this.storePostRepository.store({
			fileName,
			originalFilename,
			fileSize,
		})

		return post ? post : null
	}
}

export default StorePostUseCase
