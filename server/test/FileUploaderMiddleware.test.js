const { Router } = require('express')
const router = Router()

const Post = {}

module.exports = () => {
	const fetchPostsRouter = new FetchPostsRouter()

	router.get('/posts', new ExpressRouterAdapter(fetchPostsRouter).adaptWithBody)
}

class ExpressRouterAdapter {
	constructor(router) {
		this.router = router
	}

	async adaptWithBody(req, res) {
		const httpRequest = {
			body: req.body,
		}

		const httpResponse = await this.router.route(httpRequest)

		return res.status(httpResponse.statusCode).json(httpResponse.body)
	}
}

// presentation
class FetchPostsRouter {
	async route(httpRequest) {
		const posts = await new FetchPostsUseCase().fetch()

		return {
			statusCode: 200,
			body: posts,
		}
	}
}

// domain
class FetchPostsUseCase {
	async fetch() {
		const posts = await new FetchPostsRepository().fetchAll()

		if (!posts.length) {
			return []
		}

		return posts
	}
}

// infra
class FetchPostsRepository {
	async fetchAll() {
		const posts = await Post.find().sort('-createdAt')

		return posts
	}
}
