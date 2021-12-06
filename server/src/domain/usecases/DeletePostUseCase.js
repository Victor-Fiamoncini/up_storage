class DeletePostUseCase {
	constructor({ deletePostRepository, fileDeleteAdapter }) {
		this.deletePostRepository = deletePostRepository
		this.fileDeleteAdapter = fileDeleteAdapter
	}

	async delete({ id, hashName }) {
		await this.deletePostRepository.deleteById(id)
		await this.fileDeleteAdapter.deleteFile(hashName)
	}
}

export default DeletePostUseCase
