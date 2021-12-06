import UnimplementedMethodError from '@/src/data/errors/UnimplementedMethodError'

class FileDeleteAdapter {
	async deleteFile(file) {
		throw new UnimplementedMethodError()
	}
}

export default FileDeleteAdapter
