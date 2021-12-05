import MissingHttpRequestError from '@/src/presentation/errors/MissingHttpRequestError'
import MissingParamError from '@/src/presentation/errors/MissingParamError'
import HttpResponse from '@/src/presentation/http/HttpResponse'

class StorePostRouter {
	constructor(storePostUseCase) {
		this.storePostUseCase = storePostUseCase
	}

	async route(httpRequest) {
		try {
			if (!httpRequest) {
				throw new MissingHttpRequestError()
			}

			const { fileName, originalFileName, fileSize } = httpRequest

			if (!fileName) {
				throw new MissingParamError('fileName')
			}

			if (!originalFileName) {
				throw new MissingParamError('originalFileName')
			}

			if (!fileSize) {
				throw new MissingParamError('fileSize')
			}

			await this.storePostUseCase.store({
				fileName,
				originalFileName,
				fileSize,
			})
		} catch {
			return HttpResponse.serverError()
		}
	}
}

export default StorePostRouter
