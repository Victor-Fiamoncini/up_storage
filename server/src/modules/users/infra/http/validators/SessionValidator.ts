import { celebrate, Segments, Joi } from 'celebrate'

class SessionValidator {
	create() {
		const validationSchema = {
			[Segments.BODY]: Joi.object().keys({
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
			}),
		}

		return celebrate(validationSchema)
	}
}

export default new SessionValidator()
