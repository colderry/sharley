import UserModel, { UserDocument } from "../models/user-model";

export class User {
	public static async get (id: string, email = false) {
		let user = null;

		if (email === true) {
			user = await UserModel.findOne({ email: id });
		} else {
			user = await UserModel.findById(id);
		}

		return user;
	}

	public static async getByToken (token: string) {
		const user = await UserModel.findOne({
			api: {
				token
			}
		});

		if (!user) {
			return false;
		} else {
			return user;
		}
	}

	public static async create (data: {
		username: string;
		email: string;
		password?: string;
		signup_type?: string;
		avatar?: string;
	}) {
		await new UserModel({
			_id: Date.now(),
			username: data.username,
			email: data.email,
			password: data.password ?? null,
			signup_type: data.signup_type ?? "sharley",
			avatar: data.avatar ?? null,
			api: {
				token: User.createApiToken()
			}
		}).save();

		return User.get(data.email, true);
	}

	public static createApiToken (ln = 60) {
		const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let token = "shy_";

		for (let i = 0; i < ln; i++) {
			token += chars[Math.floor(Math.random() * chars.length)];
		}

		return token;
	}

	public static secure (data: UserDocument) {
		return {
			id: data._id,
			username: data.username,
			signup_type: data.signup_type,
			avatar: data.avatar
		}
	}
}