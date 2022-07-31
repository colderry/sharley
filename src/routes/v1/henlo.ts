import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({
		message: "Henlo World",
		ver: "v1"
	});
});

export default Router;