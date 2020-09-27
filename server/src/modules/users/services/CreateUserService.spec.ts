import CreateUserService from '@modules/users/services/CreateUserService'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider'

let userRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService

describe('CreateUser', () => {
	beforeEach(() => {
		userRepository = new FakeUserRepository()
		fakeHashProvider = new FakeHashProvider()
		createUserService = new CreateUserService(userRepository, fakeHashProvider)
	})

	it('should create a new user', async () => {
		const user = await createUserService.run({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		expect(user.name).toBe('John Doe')
		expect(user.email).toBe('johndoe@mail.com')
		expect(user.password).toBe('123456')
	})
})
