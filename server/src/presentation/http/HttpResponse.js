class HttpResponse {
	static serverError() {
		return {
			statusCode: 500,
		}
	}
}

module.exports = HttpResponse
