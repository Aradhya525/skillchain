import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sessionsTable, usersTable, skillsTable, badgesTable } from "@workspace/db";
import { or, eq } from "drizzle-orm";

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

router.get("/sessions", async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }

  const rawSessions = await db
    .select()
    .from(sessionsTable)
    .where(or(eq(sessionsTable.initiatorId, userId), eq(sessionsTable.partnerId, userId)));

  const sessions = await Promise.all(
    rawSessions.map(async (s) => {
      const initiator = await getUserWithDetails(s.initiatorId);
      const partner = await getUserWithDetails(s.partnerId);
      return { ...s, initiator, partner };
    })
  );

  res.json(sessions);
});

router.post("/sessions", async (req, res) => {
  const { initiatorId, partnerId, skillOffered, skillRequested, scheduledAt, duration, notes } = req.body;

  const [session] = await db
    .insert(sessionsTable)
    .values({
      initiatorId,
      partnerId,
      skillOffered,
      skillRequested,
      scheduledAt: new Date(scheduledAt),
      duration,
      notes,
      status: "pending",
    })
    .returning();

  const initiator = await getUserWithDetails(session.initiatorId);
  const partner = await getUserWithDetails(session.partnerId);

  res.status(201).json({ ...session, initiator, partner });
});

router.put("/sessions/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { status, notes } = req.body;

  const updateData: Record<string, unknown> = {};
  if (status) updateData.status = status;
  if (notes !== undefined) updateData.notes = notes;

  const [session] = await db.update(sessionsTable).set(updateData).where(eq(sessionsTable.id, id)).returning();

  if (status === "completed") {
    await db
      .update(usersTable)
      .set({ sessionsCompleted: db.$count(sessionsTable, eq(sessionsTable.initiatorId, session.initiatorId)) })
      .where(eq(usersTable.id, session.initiatorId));
  }

  const initiator = await getUserWithDetails(session.initiatorId);
  const partner = await getUserWithDetails(session.partnerId);

  res.json({ ...session, initiator, partner });
});

export default router;
