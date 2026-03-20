import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { usersTable, skillsTable, badgesTable } from "@workspace/db";
import { ne, eq } from "drizzle-orm";

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

router.get("/matches", async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  if (!userId) {
    res.status(400).json({ error: "userId required" });
    return;
  }

  const currentUser = await getUserWithDetails(userId);
  if (!currentUser) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const otherUsers = await db.select().from(usersTable).where(ne(usersTable.id, userId));
  const matches = [];

  for (const otherUser of otherUsers) {
    const fullOther = await getUserWithDetails(otherUser.id);
    if (!fullOther) continue;

    const myOffered = currentUser.skillsOffered.map((s) => s.name.toLowerCase());
    const myWanted = currentUser.skillsWanted.map((s) => s.name.toLowerCase());
    const theirOffered = fullOther.skillsOffered.map((s) => s.name.toLowerCase());
    const theirWanted = fullOther.skillsWanted.map((s) => s.name.toLowerCase());

    const theyHaveWhatIWant = myWanted.filter((s) => theirOffered.some((t) => t.includes(s) || s.includes(t)));
    const iHaveWhatTheyWant = theirWanted.filter((s) => myOffered.some((t) => t.includes(s) || s.includes(t)));

    const matchScore = Math.min(
      100,
      (theyHaveWhatIWant.length + iHaveWhatTheyWant.length) * 20 +
        (fullOther.trustScore / 100) * 30 +
        Math.random() * 10
    );

    const sharedCategories = currentUser.skillsOffered
      .map((s) => s.category)
      .filter((c) => fullOther.skillsOffered.some((s) => s.category === c));

    matches.push({
      id: fullOther.id,
      user: fullOther,
      matchScore: Math.round(matchScore),
      sharedSkills: [...new Set(sharedCategories)],
      complementarySkills: [...new Set([...theyHaveWhatIWant, ...iHaveWhatTheyWant])],
      status: "suggested",
    });
  }

  matches.sort((a, b) => b.matchScore - a.matchScore);
  res.json(matches);
});

export default router;
