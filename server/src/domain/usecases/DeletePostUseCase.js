class DeletePostUseCase {
	constructor({ deletePostRepository, fileDeleteAdapter }) {
		this.deletePostRepository = deletePostRepository
		this.fileDeleteAdapter = fileDeleteAdapter
	}

	async delete(id) {
		const deletedPost = await this.deletePostRepository.deleteById(id)

		if (deletedPost) {
			await this.fileDeleteAdapter.deleteFile(deletedPost?.hashName)
		}
	}
}

export default DeletePostUseCase
