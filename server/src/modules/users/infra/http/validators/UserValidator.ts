import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import Validator from '@shared/infra/http/validators/Validator'

class UserValidator {
	async create(req: Request, res: Response, next: NextFunction) {
		const validationSchema = Joi.object().keys({
			name: Joi.string().required().messages({
				'string.base': 'Name should be a text',
				'any.required': 'Name is required',
			}),
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
			passwordConfirmation: Joi.string()
				.valid(Joi.ref('password'))
				.required()
				.messages({
					'string.base': 'Password confirmation should be a text',
					'any.only': 'Password confirmation must be equal password',
					'any.required': 'Password confirmation is required',
				}),
		})

		await Validator.validate(validationSchema, req.body, next)
	}
}

export default new UserValidator()
