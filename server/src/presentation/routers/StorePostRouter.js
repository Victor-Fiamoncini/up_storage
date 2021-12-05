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

			const { fileName, originalFilename, fileSize } = httpRequest

			if (!fileName) {
				throw new MissingParamError('fileName')
			}

			if (!originalFilename) {
				throw new MissingParamError('originalFilename')
			}

			if (!fileSize) {
				throw new MissingParamError('fileSize')
			}

			await this.storePostUseCase.store({
				fileName,
				originalFilename,
				fileSize,
			})
		} catch {
			return HttpResponse.serverError()
		}
	}
}

export default StorePostRouter
