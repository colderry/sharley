import { Router } from "express";
import AuthRoute from "./auth-route";
import Henlo from "./henlo";

const router = Router();
router.use("/", Henlo);
router.use("/auth", AuthRoute);

export default router;