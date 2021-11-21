class FetchPostsRouter {
	async route(httpRequest) {
		if (!httpRequest) {
			return {
				statusCode: 500,
				body: null,
			}
		}
	}
}

describe('FetchPostsRouter', () => {
	it('should receive http request object as parameter', async () => {
		const sut = new FetchPostsRouter()
		const httpRequest = undefined

		const httpResponse = await sut.route(httpRequest)

		expect(httpResponse.statusCode).toBe(500)
	})
})
