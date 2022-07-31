import { Router } from "express";
import hello from "./henlo";
const router = Router();
router.use("/", hello);

export default router;