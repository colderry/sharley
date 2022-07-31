import UserModel from "../models/user-model";

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
			api: { key: User.createApiKey() }
		}).save();

		return User.get(data.email, true);
	}

	public static createApiKey (ln = 60) {
		const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let key = "shy_";

		for (let i = 0; i < ln; i++) {
			key += chars[Math.floor(Math.random() * chars.length)];
		}

		return key;
	}
}