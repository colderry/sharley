import { Router } from "express";
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
	}), (req, res) => {
		res.redirect("/henlo");
	}
)

export default router;