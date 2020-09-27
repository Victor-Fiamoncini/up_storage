import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider'

import AppError from '@shared/errors/AppError'

interface IRequest {
	name: string
	email: string
	password: string
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async run({ name, email, password }: IRequest) {
		const userByEmail = await this.userRepository.findByEmail(email)

		if (userByEmail) {
			throw new AppError('Email address already used')
		}

		const hashedPassword = await this.hashProvider.encrypt(password)

		const user = await this.userRepository.create({
			name,
			email,
			password: hashedPassword,
		})

		return user
	}
}

export default CreateUserService
