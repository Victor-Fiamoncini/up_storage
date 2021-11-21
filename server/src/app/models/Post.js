import { model, Schema } from 'mongoose'
import { unlink } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

const PostSchema = new Schema(
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

PostSchema.pre('save', function (next) {
	const { APP_URL, FILE_URL_PREFIX } = process.env

	if (!this.url) {
		this.url = `${APP_URL}/${FILE_URL_PREFIX}/${this.hash_name}`
	}

	return next()
})

PostSchema.pre('remove', function () {
	try {
		const pathToFile = resolve(
			__dirname,
			'..',
			'..',
			'..',
			'temp',
			this.hash_name
		)

		return promisify(unlink)(pathToFile)
	} catch (err) {
		return err
	}
})

export default model('Post', PostSchema)
