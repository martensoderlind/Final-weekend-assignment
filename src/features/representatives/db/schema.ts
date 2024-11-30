import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const representatives = pgTable("representatives", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

export const voters = pgTable("voters", {
  id: uuid("id").primaryKey().defaultRandom(),
  representativeId: uuid("representative_id")
    .notNull()
    .references(() => representatives.id),
  voteDate: timestamp("vote_date").notNull(),
});
