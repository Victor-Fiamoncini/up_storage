import { Document, model, Schema } from 'mongoose'
import { promises } from 'fs'
import { resolve } from 'path'

import uploadConfig from '@config/upload'

import IPost from '@modules/posts/models/IPost'

type PostDocument = IPost & Document

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

PostSchema.pre('save', function (this: PostDocument, next) {
	const { APP_URL, FILE_URL_PREFIX } = process.env

	if (!this.url) {
		this.url = `${APP_URL}/${FILE_URL_PREFIX}/${this.hash_name}`
	}

	return next()
})

PostSchema.pre('remove', async function (this: PostDocument) {
	const pathToFile = resolve(uploadConfig.pathToTemp, this.hash_name)

	return promises.unlink(pathToFile)
})

export default model<PostDocument>('Post', PostSchema)
