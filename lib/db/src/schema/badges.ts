import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const badgesTable = pgTable("badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badge: text("badge").notNull(),
  awardedAt: timestamp("awarded_at").notNull().defaultNow(),
});

export type Badge = typeof badgesTable.$inferSelect;
