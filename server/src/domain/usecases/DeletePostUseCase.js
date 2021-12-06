class DeletePostUseCase {
	constructor({ deletePostRepository, deleteFileAdapter }) {
		this.deletePostRepository = deletePostRepository
		this.deleteFileAdapter = deleteFileAdapter
	}

	async delete({ id, hashName }) {
		await this.deletePostRepository.deleteById(id)
		await this.deleteFileAdapter.delete(hashName)
	}
}

export default DeletePostUseCase
