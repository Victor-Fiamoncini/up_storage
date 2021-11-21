const FetchPostsRouter = require('../../../src/presentation/routers/FetchPostsRouter')

describe('FetchPostsRouter', () => {
	it('should return 500 if no httpRequest is provided', async () => {
		const sut = new FetchPostsRouter()

		const httpResponse = await sut.route()

		expect(httpResponse.statusCode).toBe(500)
	})
})
