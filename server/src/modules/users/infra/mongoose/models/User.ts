import { Document, model, Schema } from 'mongoose'

import IUserModel from '@modules/users/models/IUserModel'

type UserDocument = IUserModel & Document

const UserSchema = new Schema<UserDocument>(
	{
		name: {
			type: String,
			required: [true, 'name is required'],
		},
		email: {
			type: String,
			required: [true, 'email is required'],
		},
		password: {
			type: String,
			required: [true, 'password is required'],
			minlength: [6, 'password length is invalid'],
		},
	},
	{
		timestamps: true,
		collection: 'users',
	}
)

export default model<UserDocument>('User', UserSchema)
