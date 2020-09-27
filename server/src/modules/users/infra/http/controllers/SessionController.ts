import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

class SessionController {
	public async create(req: Request, res: Response) {
		const { email, password } = req.body

		const authenticateUserService = container.resolve(AuthenticateUserService)

		const userWithToken = await authenticateUserService.run({
			email,
			password,
		})

		const { user, token } = userWithToken

		return res.status(201).json({ user, token })
	}
}

export default new SessionController()
