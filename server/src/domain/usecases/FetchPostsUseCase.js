class FetchPostsUseCase {
	constructor(fetchPostsRepository) {
		this.fetchPostsRepository = fetchPostsRepository
	}

	async fetchPosts() {
		await this.fetchPostsRepository.fetchAll()
	}
}

module.exports = FetchPostsUseCase
