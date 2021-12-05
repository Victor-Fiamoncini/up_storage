class StorePostUseCase {
	constructor(storePostRepository) {
		this.storePostRepository = storePostRepository
	}

	async store({ fileName, originalFileName, fileSize }) {
		const post = await this.storePostRepository.store({
			fileName,
			originalFileName,
			fileSize,
		})

		return post ? post : null
	}
}

export default StorePostUseCase
