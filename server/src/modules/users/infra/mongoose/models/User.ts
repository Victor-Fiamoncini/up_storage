import { Document, model, Schema } from 'mongoose'

import IUserModel from '@modules/users/models/IUserModel'

type UserDocument = IUserModel & Document

const UserSchema = new Schema<UserDocument>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
	},
	{
		timestamps: true,
		collection: 'users',
	}
)

export default model<UserDocument>('User', UserSchema)
