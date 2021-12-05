const MissingHttpRequestError = require('../errors/MissingHttpRequestError')
const MissingParamError = require('../errors/MissingParamError')
const HttpResponse = require('../http/HttpResponse')

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

module.exports = StorePostRouter
