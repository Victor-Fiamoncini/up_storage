import { Document } from 'mongoose'

export interface IPost {
	name: string
	hashName: string
	size: number
	url?: string
}

export type IPostDocument = Document & IPost
