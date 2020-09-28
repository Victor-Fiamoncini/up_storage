import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import Validator from '@shared/infra/http/validators/Validator'

class SessionValidator {
	async create(req: Request, res: Response, next: NextFunction) {
		const validationSchema = Joi.object().keys({
			email: Joi.string().email().required().messages({
				'string.base': 'Email should be a text',
				'string.email': 'Invalid email',
				'any.required': 'Email is required',
			}),
			password: Joi.string().min(6).required().messages({
				'string.base': 'Password should be a text',
				'string.min': 'Password should have at least 6 digits',
				'any.required': 'Password is required',
			}),
		})

		await Validator.validate(validationSchema, req.body, next)
	}
}

export default new SessionValidator()
