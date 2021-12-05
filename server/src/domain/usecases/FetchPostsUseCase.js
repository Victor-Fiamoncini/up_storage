class FetchPostsUseCase {
	constructor(fetchPostsRepository) {
		this.fetchPostsRepository = fetchPostsRepository
	}

	async fetchPosts() {
		const posts = await this.fetchPostsRepository.fetchAll()

		if ((Array.isArray(posts) && !posts.length) || !posts) {
			return []
		}

		return posts
	}
}

export default FetchPostsUseCase
