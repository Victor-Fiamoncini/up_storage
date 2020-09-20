import { Document, model, Schema } from 'mongoose'
import { promises } from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/upload'

import IPostModel from '@modules/posts/models/IPostModel'

type PostDocument = IPostModel & Document

const PostSchema = new Schema<PostDocument>(
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

PostSchema.pre<PostDocument>('save', function (next) {
	const { APP_URL, FILE_URL_PREFIX } = process.env

	this.url = `${APP_URL}/${FILE_URL_PREFIX}/${this.hash_name}`

	return next()
})

PostSchema.pre<PostDocument>('remove', async function () {
	const pathToFile = resolve(uploadConfig.pathToTemp, this.hash_name)

	return promises.unlink(pathToFile)
})

export default model<PostDocument>('Post', PostSchema)
