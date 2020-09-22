import { ObjectID } from 'mongodb'

interface IUserModel {
	readonly _id?: ObjectID | string
	name: string
	email: string
	password: string
}

export default IUserModel
