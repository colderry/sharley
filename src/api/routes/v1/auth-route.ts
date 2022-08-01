import { Router, Request, Response } from "express";
import passport from "passport";

const router = Router();
router.get(
	"/github",
	passport.authenticate("github", {
		scope: ["user:email"]
	})
);

router.get(
	"/github/callback",
	passport.authenticate("github", {
		failureRedirect: "/auth/github"
	}), (req: Request, res: Response) => {
		return res.redirect("/");
	}
)

export default router;