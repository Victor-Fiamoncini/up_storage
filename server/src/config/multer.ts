import { Request } from 'express'
import { diskStorage, FileFilterCallback } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const pathToUploads = resolve(__dirname, '..', '..', '..', 'temp', 'uploads')

export default {
	pathToUploads,
	dest: pathToUploads,
	storage: diskStorage({
		destination: (req, file, callback) => {
			callback(null, pathToUploads)
		},
		filename: (req, file, callback) => {
			const hash = randomBytes(16).toString('hex')

			const filename = `${hash}-${file.originalname}`

			callback(null, filename)
		},
	}),
	limits: {
		fileSize: 4 * 1024 * 1024,
	},
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		callback: FileFilterCallback
	) => {
		const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png']

		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new Error('Invalid file type provided'))
		}
	},
}
