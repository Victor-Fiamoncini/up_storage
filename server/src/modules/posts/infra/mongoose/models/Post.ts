import { Document, model, Schema } from 'mongoose'
import { promises } from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/upload'

interface IPost extends Document {
	name: string
	hash_name: string
	size: number
	url: string
}

const PostSchema = new Schema<IPost>(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
		},
		hash_name: {
			type: String,
			required: [true, 'hash_name is required'],
		},
		size: {
			type: Number,
			required: [true, 'size is required'],
		},
		url: {
			type: String,
			default: '',
		},
	},
	{
		timestamps: true,
		collection: 'posts',
	}
)

PostSchema.pre('save', function (this: IPost, next) {
	const { APP_URL, FILE_URL_PREFIX } = process.env

	if (!this.url) {
		this.url = `${APP_URL}/${FILE_URL_PREFIX}/${this.hash_name}`
	}

	return next()
})

PostSchema.pre('remove', async function (this: IPost) {
	const pathToFile = resolve(uploadConfig.pathToUploads, this.hash_name)

	return promises.unlink(pathToFile)
})

export default model<IPost>('Post', PostSchema)
