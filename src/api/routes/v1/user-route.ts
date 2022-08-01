import { checkBearer } from "../../../utils/middleware";
import { Router } from "express";
import Controller from "../../controllers";

const router = Router();
router.get("/self", 
	checkBearer, Controller.use("user", "v1", "getSelf")
);

export default router;