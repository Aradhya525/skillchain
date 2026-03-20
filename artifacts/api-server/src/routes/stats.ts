import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, sessionsTable, skillsTable, reviewsTable } from "@workspace/db";
import { avg } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (_req, res) => {
  const [userCount] = await db.select({ count: db.$count(usersTable) }).from(usersTable);
  const [sessionCount] = await db.select({ count: db.$count(sessionsTable) }).from(sessionsTable);
  const [skillCount] = await db.select({ count: db.$count(skillsTable) }).from(skillsTable);
  const [reviewCount] = await db.select({ count: db.$count(reviewsTable) }).from(reviewsTable);
  const [avgScore] = await db.select({ avg: avg(usersTable.trustScore) }).from(usersTable);

  res.json({
    totalUsers: Number(userCount?.count ?? 0),
    totalSessions: Number(sessionCount?.count ?? 0),
    totalSkills: Number(skillCount?.count ?? 0),
    totalReviews: Number(reviewCount?.count ?? 0),
    avgTrustScore: Math.round(Number(avgScore?.avg ?? 0) * 10) / 10,
  });
});

export default router;
