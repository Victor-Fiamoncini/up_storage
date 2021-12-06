import Env from '@/src/main/config/Env'
import MulterFileStoreAdapter from '@/src/infra/adapters/MulterFileStoreAdapter'

class FileStoreAdapterFactory {
	static make() {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

		return new MulterFileStoreAdapter(Env.app.tempPath, allowedMimes)
	}
}

export default FileStoreAdapterFactory
