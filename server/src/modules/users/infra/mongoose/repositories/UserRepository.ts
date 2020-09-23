import User from '@modules/users/infra/mongoose/models/User'

import IUserRepository from '@modules/users/repositories/IUserRepository'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UserRepository implements IUserRepository {
	private readonly model = User

	public async findByEmail(email: string) {
		return this.model.findOne({ email })
	}

	public async create({ name, email, password }: ICreateUserDTO) {
		return this.model.create({ name, email, password })
	}
}

export default UserRepository
