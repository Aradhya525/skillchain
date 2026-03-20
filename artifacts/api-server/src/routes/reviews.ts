import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { reviewsTable, usersTable, skillsTable, badgesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

async function getUserWithDetails(userId: number) {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user[0]) return null;
  const skills = await db.select().from(skillsTable).where(eq(skillsTable.userId, userId));
  const badges = await db.select().from(badgesTable).where(eq(badgesTable.userId, userId));
  return {
    ...user[0],
    skillsOffered: skills.filter((s) => s.type === "offered").map((s) => ({ id: s.id, name: s.name, category: s.category, level: s.level })),
    skillsWanted: skills.filter((s) => s.type === "wanted").map((s) => ({ id: s.id, name: s.name, category: s.category, level: s.level })),
    badges: badges.map((b) => b.badge),
  };
}

router.get("/reviews", async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }

  const rawReviews = await db.select().from(reviewsTable).where(eq(reviewsTable.revieweeId, userId));

  const reviews = await Promise.all(
    rawReviews.map(async (r) => {
      const reviewer = await getUserWithDetails(r.reviewerId);
      return { ...r, reviewer };
    })
  );

  res.json(reviews);
});

router.post("/reviews", async (req, res) => {
  const { reviewerId, revieweeId, rating, comment, skillExchanged } = req.body;
  const [review] = await db.insert(reviewsTable).values({ reviewerId, revieweeId, rating, comment, skillExchanged }).returning();

  // Update trust score based on new review
  const allReviews = await db.select().from(reviewsTable).where(eq(reviewsTable.revieweeId, revieweeId));
  const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  const newTrustScore = Math.min(100, 40 + avgRating * 12);

  await db.update(usersTable).set({ trustScore: Math.round(newTrustScore * 10) / 10 }).where(eq(usersTable.id, revieweeId));

  const reviewer = await getUserWithDetails(review.reviewerId);
  res.status(201).json({ ...review, reviewer });
});

export default router;
