import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository'
import FakeHashProvider from '@shared/container/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUserRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService
let authenticateUserService: AuthenticateUserService

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUserRepository()
		fakeHashProvider = new FakeHashProvider()

		createUserService = new CreateUserService(
			fakeUserRepository,
			fakeHashProvider
		)

		authenticateUserService = new AuthenticateUserService(
			fakeUserRepository,
			fakeHashProvider
		)
	})

	it('should be able to authenticate', async () => {
		const user = await createUserService.run({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const res = await authenticateUserService.run({
			email: 'johndoe@mail.com',
			password: '123456',
		})

		expect(res).toHaveProperty('token')
		expect(res.user).toEqual(user)
	})

	it('should not be able to authenticate with non existing user', async () => {
		await expect(
			authenticateUserService.run({
				email: 'johndoe@mail.com',
				password: '123456',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await createUserService.run({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await expect(
			authenticateUserService.run({
				email: 'johndoe@mail.com',
				password: 'wrongPassword',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
