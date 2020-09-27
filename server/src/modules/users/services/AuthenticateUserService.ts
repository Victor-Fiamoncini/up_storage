import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'

import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'

interface IRequest {
	email: string
	password: string
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async run({ email, password }: IRequest) {
		const user = await this.userRepository.findByEmail(email)

		if (!user) {
			throw new AppError('Invalid credentials', 401)
		}

		const passwordMatched = await this.hashProvider.compare(
			password,
			user.password
		)

		if (!passwordMatched) {
			throw new AppError('Invalid credentials', 401)
		}

		const { secret, expiresIn } = authConfig.jwt

		const token = sign({}, secret, { subject: String(user._id), expiresIn })

		return {
			user,
			token,
		}
	}
}

export default AuthenticateUserService
