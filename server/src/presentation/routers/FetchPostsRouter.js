const HttpResponse = require('../http/HttpResponse')

class FetchPostsRouter {
	constructor(fetchPostsUseCase) {
		this.fetchPostsUseCase = fetchPostsUseCase
	}

	async route(httpRequest) {
		if (
			!httpRequest ||
			!this.fetchPostsUseCase ||
			!this.fetchPostsUseCase.fetchPosts
		) {
			return HttpResponse.serverError()
		}

		await this.fetchPostsUseCase.fetchPosts()
	}
}

module.exports = FetchPostsRouter
