class DeletePostUseCase {
	constructor(deletePostRepository) {
		this.deletePostRepository = deletePostRepository
	}

	async delete(id) {
		await this.deletePostRepository.deleteById(id)
	}
}

export default DeletePostUseCase
