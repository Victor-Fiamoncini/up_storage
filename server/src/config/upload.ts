import { Request } from 'express'
import { diskStorage, FileFilterCallback } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

import AppError from '@shared/errors/AppError'

const pathToTemp = resolve(__dirname, '..', '..', 'temp')

export default {
	pathToTemp,
	dest: pathToTemp,
	storage: diskStorage({
		destination: (req, file, callback) => {
			callback(null, pathToTemp)
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
		const allowedMimes = ['image/jpeg', 'image/png']

		if (allowedMimes.includes(file.mimetype)) {
			callback(null, true)
		} else {
			callback(new AppError('Invalid file type provided'))
		}
	},
}
