import mongoose, { Schema, model, Document } from "mongoose";

const LinkSchema = new Schema({
	_id: String,
	code: {
		type: String,
		unique: true,
		required: true
	},
	redirect: {
		_id: false,
		to: {
			type: String,
			required: true
		}
	},
	owner: {
		type: String,
		required: true
	}
}, {
	versionKey: false,
	timestamps: true
});

export interface LinkDocument extends Document {
	_id: string;
	code: string;
	redirect: LinkDocumentRedirect;
	owner: string;
	createdAt: string;
	updatedAt: string;
}

export interface LinkDocumentRedirect {
	to: string;
}

export default mongoose.models.links || model("links", LinkSchema);