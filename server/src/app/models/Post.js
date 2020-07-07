import { model, Schema } from 'mongoose'

const PostSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
		},
		size: {
			type: Number,
			required: [true, 'size is required'],
		},
		key: {
			type: String,
			required: [true, 'key is required'],
		},
		url: {
			type: String,
			required: [true, 'url is required'],
		},
	},
	{
		timestamps: true,
		collection: 'posts',
	}
)

export default model('Post', PostSchema)
