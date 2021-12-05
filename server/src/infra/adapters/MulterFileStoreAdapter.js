import multer from 'multer'
import { randomBytes } from 'crypto'

import FileStoreAdapter from '@/src/data/adapters/FileStoreAdapter'

class MulterFileStoreAdapter extends FileStoreAdapter {
	constructor(pathToTemp, allowedMimes = []) {
		super()

		this.pathToTemp = pathToTemp
		this.allowedMimes = allowedMimes
	}

	get config() {
		return {
			dest: this.pathToTemp,
			storage: multer.diskStorage({
				destination: (req, file, callback) => {
					callback(null, this.pathToTemp)
				},
				filename: (req, file, callback) => {
					randomBytes(16, (err, buf) => {
						if (err) {
							callback(err, '')
						}

						const filename = `${buf.toString('hex')}-${file.originalname}`
						callback(null, filename)
					})
				},
			}),
			limits: {
				fileSize: 4 * 1024 * 1024,
			},
			fileFilter: (req, file, callback) => {
				if (this.allowedMimes.includes(file.mimetype)) {
					callback(null, true)
				} else {
					callback(new Error('Invalid file type'))
				}
			},
		}
	}

	storeFile(file) {
		return multer(this.config).single(file)
	}
}

export default MulterFileStoreAdapter
