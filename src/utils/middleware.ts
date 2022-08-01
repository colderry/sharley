import { Request, Response, NextFunction } from "express";
import { User } from "../data";
import ErrorCode from "./error-code";

export async function checkBearer (
	req: Request, 
	res: Response, 
	next: NextFunction
) {
	const auth = `${req.headers.authorization}`.split("Bearer ")[1];
	const user = await User.getByToken(auth);

	if (!user) {
		return res.status(401).json({
			code: ErrorCode.invalidBearer(),
			message: "You are not authorized"
		});
	} else {
		res.locals.user = user;
		return next();
	}
}