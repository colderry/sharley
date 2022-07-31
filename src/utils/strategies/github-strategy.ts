import { Strategy } from "passport-github2";
import UserModel from "../../models/user-model";
import createUser from "../create-user";
import axios from "axios";

const callback = async (
	accessToken: string,
	refreshToken: string,
	profile: any,
	done: any
) => {
	process.nextTick(async () => {
		const res = await axios.get("https://api.github.com/user/emails", {
			headers: {
				Authorization: `token ${accessToken}`
			}
		});

		const { email } = [...res.data].find((v) => v.primary === true);
		let user = await UserModel.findOne({ email });

		if (!user) {
			user = await createUser({
				username: profile.username,
				email, avatar: profile.avatar
			});
		}

		done(null, user);
	})
}

export const GitHubStrategy = new Strategy({
	clientID: process.env.GitHub_Client_ID,
	clientSecret: process.env.GitHub_Client_Secret,
	callbackURL: process.env.GitHub_Callback_URL
}, callback);