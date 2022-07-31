import mongoose, { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
	_id: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	avatar: {
		
	}
}, {
	versionKey: false,
	timestamps: true
});

export interface UserDocument extends Document {
	_id: string;
	username: string;
	email: string;
	createdAt: string;
	updatedAt: string;
}

export default mongoose.models.users || model<UserDocument>("users", UserSchema);