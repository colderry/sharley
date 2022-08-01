import { checkBearer } from "../../../utils/middleware";
import { Router } from "express";
import Controller from "../../controllers";

const router = Router();
router.get("/",
	checkBearer, Controller.use("link", "v1", "get")
);

router.post("/", 
	checkBearer, Controller.use("link", "v1", "post")
);

export default router;