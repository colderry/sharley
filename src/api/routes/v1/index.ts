import { Router } from "express";

import AuthRoute from "./auth-route";
import LinkRoute from "./link-route";

const router = Router();
router.use("/auth", AuthRoute);
router.use("/link", LinkRoute);

export default router;