import IUserModel from '@modules/users/models/IUserModel'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

interface IUserRepository {
	findByEmail(email: string): Promise<IUserModel | null>
	create(data: ICreateUserDTO): Promise<IUserModel>
}

export default IUserRepository
