import { ObjectID } from 'mongodb'

interface IPost {
	readonly _id?: ObjectID | string
	name: string
	hash_name: string
	size: number
	url: string
}

export default IPost
