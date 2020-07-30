import { Request } from 'express'
import { resolve } from 'path'
import { randomBytes } from 'crypto'
import multer, { FileFilterCallback } from 'multer'

const pathToUploads = resolve(__dirname, '..', '..', 'temp', 'uploads')
const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

export default {
	dest: pathToUploads,
	storage: multer.diskStorage({
		destination: (request, file, callback) => {
			callback(null, pathToUploads)
		},
		filename: (request, file, callback) => {
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
		fileSize: 3 * 1024 * 1024,
	},
	fileFilter: (
		request: Request,
		file: Express.Multer.File,
		callback: FileFilterCallback
	): void => {
		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid file type'))
		}
	},
}
