import UserModel from "../models/user-model";

export default async function createUser(data: userData) {
	const options: Partial<userData> = {};

	if (data.username) {
		options.username = data.username;
	}

	if (data.email) {
		options.email = data.email;
	}

	if (data.avatar) {
		options.avatar = data.avatar;
	}

	const user = new UserModel({
		_id: Date.now() + Math.floor(Math.random() * 1000 * 1000),
		...options
	});

	await user.save();
	return user;
}

interface userData {
	username: string;
	email: string;
	avatar?: string;
}