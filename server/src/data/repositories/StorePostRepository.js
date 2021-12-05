import UnimplementedMethodError from '@/src/data/errors/UnimplementedMethodError'

class StorePostRepository {
	async store() {
		throw new UnimplementedMethodError()
	}
}

export default StorePostRepository
