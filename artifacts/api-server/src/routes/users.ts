import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, skillsTable, badgesTable } from "@workspace/db";
import { eq, or } from "drizzle-orm";

const router: IRouter = Router();

async function getUserWithDetails(userId: number) {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
  if (!user[0]) return null;

  const skills = await db.select().from(skillsTable).where(eq(skillsTable.userId, userId));
  const badges = await db.select().from(badgesTable).where(eq(badgesTable.userId, userId));

  return {
    ...user[0],
    skillsOffered: skills
      .filter((s) => s.type === "offered")
      .map((s) => ({ id: s.id, name: s.name, category: s.category, level: s.level })),
    skillsWanted: skills
      .filter((s) => s.type === "wanted")
      .map((s) => ({ id: s.id, name: s.name, category: s.category, level: s.level })),
    badges: badges.map((b) => b.badge),
  };
}

router.get("/users", async (_req, res) => {
  const users = await db.select().from(usersTable);
  const usersWithDetails = await Promise.all(users.map((u) => getUserWithDetails(u.id)));
  res.json(usersWithDetails.filter(Boolean));
});

router.get("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const user = await getUserWithDetails(id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

router.post("/users", async (req, res) => {
  const { name, email, bio, location, skillsOffered = [], skillsWanted = [] } = req.body;

  const [user] = await db.insert(usersTable).values({ name, email, bio, location }).returning();

  if (skillsOffered.length > 0) {
    await db.insert(skillsTable).values(
      skillsOffered.map((s: string) => ({
        name: s,
        category: "General",
        level: "intermediate",
        userId: user.id,
        type: "offered",
      }))
    );
  }

  if (skillsWanted.length > 0) {
    await db.insert(skillsTable).values(
      skillsWanted.map((s: string) => ({
        name: s,
        category: "General",
        level: "intermediate",
        userId: user.id,
        type: "wanted",
      }))
    );
  }

  // Award first badge
  await db.insert(badgesTable).values({ userId: user.id, badge: "🌱 New Member" });

  const fullUser = await getUserWithDetails(user.id);
  res.status(201).json(fullUser);
});

router.put("/users/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, bio, location, avatar, skillsOffered, skillsWanted } = req.body;

  const updateData: Record<string, unknown> = {};
  if (name !== undefined) updateData.name = name;
  if (bio !== undefined) updateData.bio = bio;
  if (location !== undefined) updateData.location = location;
  if (avatar !== undefined) updateData.avatar = avatar;

  if (Object.keys(updateData).length > 0) {
    await db.update(usersTable).set(updateData).where(eq(usersTable.id, id));
  }

  if (skillsOffered !== undefined) {
    await db.delete(skillsTable).where(eq(skillsTable.userId, id));
    if (skillsOffered.length > 0) {
      await db.insert(skillsTable).values(
        skillsOffered.map((s: string) => ({
          name: s,
          category: "General",
          level: "intermediate",
          userId: id,
          type: "offered",
        }))
      );
    }
    if (skillsWanted && skillsWanted.length > 0) {
      await db.insert(skillsTable).values(
        skillsWanted.map((s: string) => ({
          name: s,
          category: "General",
          level: "intermediate",
          userId: id,
          type: "wanted",
        }))
      );
    }
  }

  const fullUser = await getUserWithDetails(id);
  res.json(fullUser);
});

export default router;
