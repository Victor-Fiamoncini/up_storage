import { v4 as uuid } from 'uuid'

import IUserModel from '@modules/users/models/IUserModel'
import IUserRepository from '@modules/users/repositories/IUserRepository'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class FakeUserRepository implements IUserRepository {
	private users: IUserModel[] = []

	public async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		return user || null
	}

	public async create({ name, email, password }: ICreateUserDTO) {
		const _id = uuid()

		this.users.push({ _id, name, email, password })

		return { _id, name, email, password }
	}
}

export default FakeUserRepository
