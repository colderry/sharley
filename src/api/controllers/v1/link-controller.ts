import { Request, Response } from "express";
import { Link } from "../../../data";
import Validator from "validator";
import ErrorCode from "../../../utils/error-code";

class V1LinkController {
	public static async get (req: Request, res: Response) {
		const links = await Link.getAll(res.locals.user._id);
		return res.status(200).json(links);
	}

	public static async post (req: Request, res: Response) {
		const { url } = req.body;

		if (!url) {
			return res.status(400).json({
				code: ErrorCode.noBodyUrl(),
				message: "The 'url' property was not found in body"
			});
		}

		if (!Validator.isURL(url)) {
			return res.status(400).json({
				code: ErrorCode.invalidUrl(),
				message: "The 'url' is not a valid url."
			});
		}

		const link = await Link.create(url, {
			owner: res.locals.user._id
		});

		res.status(200).json(link);
	}
}

export default V1LinkController;