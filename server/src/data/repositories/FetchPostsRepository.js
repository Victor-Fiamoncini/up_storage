const UnimplementedMethodError = require('../errors/UnimplementedMethodError')

class FetchPostsRepository {
	async fetchAll() {
		throw new UnimplementedMethodError()
	}
}

module.exports = FetchPostsRepository
