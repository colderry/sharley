import mongoose, { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
	_id: Number,

	api: {
		token: {
			type: String,
			required: true
		}
	},

	avatar: {
		type: String,
		default: null
	},

	email: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		default: null
	},

	username: {
		type: String,
		required: true,
		unique: true
	},

	signup_type: {
		type: String,
		required: true
	},

	verified: {
		type: Boolean,
		default: false
	}

}, {
	versionKey: false,
	timestamps: true
});

export interface UserDocument extends Document {
	_id: number;
	api: UserDocumentApi;
	avatar: string | null;
	email: string;
	password: string | null;
	username: string;
	signup_type: string;
	verified: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface UserDocumentApi {
	token: string
}

export default mongoose.models.users || model<UserDocument>("users", UserSchema);