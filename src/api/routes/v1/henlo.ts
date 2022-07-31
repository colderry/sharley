import { Router } from "express";
const router = Router();

router.get("/henlo", (req, res) => {
	if (req.user) {
		return res.status(200).json({
			message: `Henlo ${(req.user as { username: string}).username}`,
			ver: "v1"
		});
	}

	res.status(200).json({
		message: "Henlo World",
		ver: "v1"
	});
});

export default router;