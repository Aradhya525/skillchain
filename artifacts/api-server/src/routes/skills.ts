import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { skillsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/skills", async (_req, res) => {
  const skills = await db.select().from(skillsTable);
  res.json(skills);
});

router.post("/skills", async (req, res) => {
  const { name, category, level, userId, type } = req.body;
  const [skill] = await db.insert(skillsTable).values({ name, category, level, userId, type }).returning();
  res.status(201).json(skill);
});

export default router;
