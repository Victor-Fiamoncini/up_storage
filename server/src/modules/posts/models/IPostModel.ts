import { ObjectID } from 'mongodb'

interface IPostModel {
	readonly _id?: ObjectID | string
	name: string
	hash_name: string
	size: number
	url: string
}

export default IPostModel
