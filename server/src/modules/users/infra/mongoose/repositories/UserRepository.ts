import User from '@modules/users/infra/mongoose/models/User'

import IUserRepository from '@modules/users/repositories/IUserRepository'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UserRepository implements IUserRepository {
	private readonly model = User

	public async findByEmail(email: string) {
		return this.model.findOne({ email })
	}

	public async create({ name, email, password }: ICreateUserDTO) {
		const user = new this.model({ name, email, password })

		return user.save()
	}
}

export default UserRepository
