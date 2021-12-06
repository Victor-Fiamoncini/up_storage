import { promises } from 'fs'

import FileDeleteAdapter from '@/src/data/adapters/FileDeleteAdapter'

class FSFileDeleteAdapter extends FileDeleteAdapter {
	constructor(pathToTemp) {
		super()

		this.pathToTemp = pathToTemp
	}

	async deleteFile(file) {
		await promises.unlink(`${this.pathToTemp}/${file}`)
	}
}

export default FSFileDeleteAdapter
