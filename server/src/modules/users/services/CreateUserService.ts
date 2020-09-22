import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IUserRepository from '@modules/users/repositories/IUserRepository'

interface IRequest {
	name: string
	email: string
	password: string
}

@injectable()
class CreateUserService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUserRepository
	) {}

	public async run({ name, email, password }: IRequest) {
		return this.userRepository.create({ name, email, password })
	}
}

export default CreateUserService
