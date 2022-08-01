import { Router } from "express";

import AuthRoute from "./auth-route";
import LinkRoute from "./link-route";
import UserRoute from "./user-route";

const router = Router();
router.use("/auth", AuthRoute);
router.use("/link", LinkRoute);
router.use("/user", UserRoute);

export default router;