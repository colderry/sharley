import { UserDocument } from "../models/user-model";

declare global {
	namespace Express {
		
		export interface Request {
			token?: boolean;
			user: UserDocument;
		}

		export interface Response {
			locals: {
				user: UserDocument;
			}
		}
	}
}