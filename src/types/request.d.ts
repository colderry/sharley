import { UserDocument } from "../models/user-model";

namespace Express {
	export interface Response {
		locals: {
			user: UserDocument;
		}
	}
}