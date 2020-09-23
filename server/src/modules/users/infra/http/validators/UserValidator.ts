import { celebrate, Segments, Joi } from 'celebrate'

class UserValidator {
	async create() {
		return celebrate({
			[Segments.BODY]: {
				name: Joi.string().required(),
				email: Joi.string().email().required(),
				password: Joi.string().required(),
				passwordConfirmation: Joi.string().valid(Joi.ref('password')),
			},
		})
	}
}

export default new UserValidator()
