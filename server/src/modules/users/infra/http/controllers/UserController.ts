import { Request, Response } from 'express'
import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

class UserController {
	public async create(req: Request, res: Response) {
		const { name, email, password } = req.body

		const createUserService = container.resolve(CreateUserService)

		const user = await createUserService.run({
			name,
			email,
			password,
		})

		return res.status(201).json(user)
	}
}

export default new UserController()
