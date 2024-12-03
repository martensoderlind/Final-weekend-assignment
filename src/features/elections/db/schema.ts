import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const elections = pgTable("elections", {
  id: uuid("id").primaryKey().defaultRandom(),
  subject: text("subject").notNull(),
  created: timestamp("created").notNull().defaultNow(),
  concluded: timestamp("concluded"),
  active: boolean("active").notNull().default(true),
});

export const votes = pgTable("votes", {
  id: uuid("id").primaryKey().defaultRandom(),
  electionId: uuid("election_id")
    .notNull()
    .references(() => elections.id, { onDelete: "cascade" }),
  voterId: uuid("voter_id"),
  representativeId: uuid("representative_id"),
  choice: uuid("alternative_id").references(() => electionVoteAlternatives.id),
});

export const electionVoteAlternatives = pgTable("electionVoteAlternatives", {
  id: uuid("id").primaryKey().defaultRandom(),
  electionId: uuid("election_id")
    .notNull()
    .references(() => elections.id, { onDelete: "cascade" }),
  choice: text("choice").notNull(),
});
