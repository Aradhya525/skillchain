import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";
import skillsRouter from "./skills";
import matchesRouter from "./matches";
import sessionsRouter from "./sessions";
import messagesRouter from "./messages";
import reviewsRouter from "./reviews";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(usersRouter);
router.use(skillsRouter);
router.use(matchesRouter);
router.use(sessionsRouter);
router.use(messagesRouter);
router.use(reviewsRouter);
router.use(statsRouter);

export default router;
