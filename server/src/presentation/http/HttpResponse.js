import ServerError from '@/src/presentation/errors/ServerError'

class HttpResponse {
	static ok(data = null) {
		return {
			statusCode: 200,
			body: data,
		}
	}

	static serverError() {
		return {
			statusCode: 500,
			body: new ServerError(),
		}
	}
}

export default HttpResponse
