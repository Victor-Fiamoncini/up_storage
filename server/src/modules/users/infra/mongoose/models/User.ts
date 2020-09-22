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
		},
	},
	{
		timestamps: true,
		collection: 'users',
	}
)

UserSchema.pre<UserDocument>('save', function (next) {})

export default model<UserDocument>('User', UserSchema)
