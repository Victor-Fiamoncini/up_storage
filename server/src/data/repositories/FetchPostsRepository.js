import UnimplementedMethodError from '@/src/data/errors/UnimplementedMethodError'

class FetchPostsRepository {
	async fetchAll() {
		throw new UnimplementedMethodError()
	}
}

export default FetchPostsRepository
