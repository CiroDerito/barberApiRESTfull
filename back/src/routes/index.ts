import { Router } from "express";
import userRouter from "./userRouter";
import appointmentsRouter from "./appointmentsRouter";
const router: Router = Router()

router.use("/users", userRouter)
router.use("/turns", appointmentsRouter)

export default router;