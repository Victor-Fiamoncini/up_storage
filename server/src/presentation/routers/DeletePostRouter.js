import MissingHttpRequestError from '@/src/presentation/errors/MissingHttpRequestError'
import MissingParamError from '@/src/presentation/errors/MissingParamError'
import HttpResponse from '@/src/presentation/http/HttpResponse'

class DeletePostRouter {
	constructor(deletePostUseCase) {
		this.deletePostUseCase = deletePostUseCase
	}

	async route(httpRequest) {
		try {
			if (!httpRequest) {
				throw new MissingHttpRequestError()
			}

			const { id } = httpRequest

			if (!id) {
				throw new MissingParamError('id')
			}

			await this.deletePostUseCase.delete(id)

			return HttpResponse.noContent()
		} catch {
			return HttpResponse.serverError()
		}
	}
}

export default DeletePostRouter
