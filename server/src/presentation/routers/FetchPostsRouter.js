const HttpResponse = require('../http/HttpResponse')

class FetchPostsRouter {
	async route(httpRequest) {
		if (!httpRequest) {
			return HttpResponse.serverError()
		}
	}
}

module.exports = FetchPostsRouter
