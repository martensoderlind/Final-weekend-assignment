import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const voterTable = pgTable("voter", {
  id: uuid("id").primaryKey().defaultRandom(),
  representativeId: text("subject").notNull(),
  voteDate: text("subject").notNull(),
});

export const elections = pgTable("elections", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject: text("subject").notNull(),
  created: timestamp("created").notNull().defaultNow(),
  concluded: timestamp("concluded"),
  active: boolean("active").notNull().default(true),
});

export const electionAlternatives = pgTable("election_alternatives", {
  id: uuid("id").primaryKey().defaultRandom(),
  electionId: uuid("election_id")
    .notNull()
    .references(() => elections.id, { onDelete: "cascade" }),
  voterId: uuid("voter_id"),
  representativeId: uuid("representative_id").references(
    () => representatives.id
  ),
  choice: text("choice").notNull(),
});

export const representatives = pgTable("representatives", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
