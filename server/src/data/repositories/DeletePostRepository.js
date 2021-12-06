import UnimplementedMethodError from '@/src/data/errors/UnimplementedMethodError'

class DeletePostRepository {
	async deleteById() {
		throw new UnimplementedMethodError()
	}
}

export default DeletePostRepository
