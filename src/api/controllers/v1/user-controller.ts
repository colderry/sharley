import { Request, Response } from "express";
import { User } from "../../../data";

class V1UserController {
	public static async getSelf (req: Request, res: Response) {
		const user = User.secure(res.locals.user);
		return res.status(200).json(user);
	}
}

export default V1UserController;