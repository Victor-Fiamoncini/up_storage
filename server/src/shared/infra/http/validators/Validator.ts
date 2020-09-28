import { NextFunction } from 'express'
import { ObjectSchema } from 'joi'

import AppError from '@shared/errors/AppError'

class Validator {
	async validate(schema: ObjectSchema, data: object, next: NextFunction) {
		try {
			await schema.validateAsync(data, { abortEarly: true })

			return next()
		} catch (err) {
			throw new AppError(err.message)
		}
	}
}

export default new Validator()
