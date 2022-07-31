import { Router } from "express";
const router = Router();

router.get("/henlo", (req, res) => {
	res.status(200).json({
		message: "Henlo World",
		ver: "v1"
	});
});

export default router;