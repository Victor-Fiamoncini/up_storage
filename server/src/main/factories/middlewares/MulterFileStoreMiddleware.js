import multer from 'multer'
import { randomBytes } from 'crypto'

import env from '@/src/main/config/env'

const pathToTemp = env.app.tempPath
const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

class MulterFileStoreMiddleware {
	static get config() {
		return {
			dest: pathToTemp,
			storage: multer.diskStorage({
				destination: (req, file, callback) => {
					callback(null, pathToTemp)
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
				if (allowedMimes.includes(file.mimetype)) {
					callback(null, true)
				} else {
					callback(new Error('Invalid file type'))
				}
			},
		}
	}

	static get storeFile() {
		return fileAlias => multer(this.config).single(fileAlias)
	}
}

export default MulterFileStoreMiddleware
