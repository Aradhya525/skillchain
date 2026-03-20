import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { messagesTable } from "@workspace/db";
import { or, and, eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/messages", async (req, res) => {
  const userId = parseInt(req.query.userId as string);
  const partnerId = parseInt(req.query.partnerId as string);

  if (!userId || !partnerId) {
    res.status(400).json({ error: "userId and partnerId required" });
    return;
  }

  const messages = await db
    .select()
    .from(messagesTable)
    .where(
      or(
        and(eq(messagesTable.senderId, userId), eq(messagesTable.receiverId, partnerId)),
        and(eq(messagesTable.senderId, partnerId), eq(messagesTable.receiverId, userId))
      )
    );

  res.json(messages);
});

router.post("/messages", async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const [message] = await db.insert(messagesTable).values({ senderId, receiverId, content }).returning();
  res.status(201).json(message);
});

export default router;
