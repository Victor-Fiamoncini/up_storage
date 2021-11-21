const MissingHttpRequestError = require('../errors/MissingHttpRequestError')
const HttpResponse = require('../http/HttpResponse')

class FetchPostsRouter {
	constructor(fetchPostsUseCase) {
		this.fetchPostsUseCase = fetchPostsUseCase
	}

	async route(httpRequest) {
		try {
			if (!httpRequest) {
				throw new MissingHttpRequestError()
			}

			const posts = await this.fetchPostsUseCase.fetchPosts()

			return HttpResponse.ok(posts)
		} catch (error) {
			return HttpResponse.serverError()
		}
	}
}

module.exports = FetchPostsRouter
