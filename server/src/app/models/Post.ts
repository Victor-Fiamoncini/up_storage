import { model, Schema } from 'mongoose'
import { unlink } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

import { IPostDocument } from '@src/app/models/types/IPost'

const PostSchema = new Schema<IPostDocument>(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
			trim: true,
		},
		hashName: {
			type: String,
			required: [true, 'hashName is required'],
			trim: true,
		},
		size: {
			type: Number,
			required: [true, 'size is required'],
			trim: true,
		},
		url: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
		collection: 'posts',
	}
)

PostSchema.pre('save', function (this: IPostDocument, next) {
	const { APP_URL, FILE_URL_PREFIX } = process.env

	if (!this.url) {
		this.url = `${APP_URL}/${FILE_URL_PREFIX}/${this.hashName}`
	}

	return next()
})

PostSchema.pre('remove', function (this: IPostDocument) {
	try {
		const pathToFile = resolve(
			__dirname,
			'..',
			'..',
			'..',
			'temp',
			'uploads',
			this.hashName
		)

		return promisify(unlink)(pathToFile)
	} catch (err) {
		throw new Error('Error to remove file')
	}
})

export default model<IPostDocument>('Post', PostSchema)
