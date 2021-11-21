const HttpResponse = require('../http/HttpResponse')

class FetchPostsRouter {
	constructor(fetchPostsUseCase) {
		this.fetchPostsUseCase = fetchPostsUseCase
	}

	async route(httpRequest) {
		if (!httpRequest) {
			return HttpResponse.serverError()
		}
	}
}

module.exports = FetchPostsRouter
