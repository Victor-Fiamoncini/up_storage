import CreateUserService from '@modules/users/services/CreateUserService'
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'

let userRepository: FakeUserRepository
let createUserService: CreateUserService

describe('CreateUser', () => {
	beforeEach(() => {
		userRepository = new FakeUserRepository()
		createUserService = new CreateUserService(userRepository)
	})

	it('should create a new user', async () => {
		const user = await createUserService.run({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		expect(user.name).toBe('johndoe@mail.com')
		expect(user.email).toBe('johndoe@mail.com')
		expect(user.password).toBe('123456')
	})
})
