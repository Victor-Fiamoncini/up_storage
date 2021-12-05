import UnimplementedMethodError from '@/src/data/errors/UnimplementedMethodError'

class FileStoreAdapter {
	async storeFile(file) {
		throw new UnimplementedMethodError()
	}
}

export default FileStoreAdapter
