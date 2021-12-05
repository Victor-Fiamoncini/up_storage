import MissingHttpRequestError from '@/src/presentation/errors/MissingHttpRequestError'
import HttpResponse from '@/src/presentation/http/HttpResponse'

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
		} catch {
			return HttpResponse.serverError()
		}
	}
}

export default FetchPostsRouter
