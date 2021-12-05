import env from '@/src/main/config/env'
import MulterFileStoreAdapter from '@/src/infra/adapters/MulterFileStoreAdapter'

class FileStoreAdapterFactory {
	static make() {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

		return new MulterFileStoreAdapter(env.app.tempPath, allowedMimes)
	}
}

export default FileStoreAdapterFactory
