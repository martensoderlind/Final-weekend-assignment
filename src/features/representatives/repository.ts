import { Db } from "@/index";
import { eq, sql } from "drizzle-orm";
import { representatives, voters } from "./db/schema";
import { NewRepresentative, NewVoter } from "./types";

export function createRepository(db: Db) {
  return {
    async getRepresentative(representativeId: string) {
      return await db
        .select()
        .from(representatives)
        .where(eq(representatives.id, representativeId));
    },
    async getAllRepresentatives() {
      return await db.select().from(representatives);
    },

    async getAllVotersById(id: string) {
      const voter = await db.select().from(voters).where(eq(voters.id, id));
      return voter;
    },

    async getRepresentativeInformation() {
      const representativeVotes = await db
        .select({
          id: representatives.id,
          name: representatives.name,
          votes: sql<number>`count(DISTINCT ${voters.id})`,
        })
        .from(representatives)
        .leftJoin(voters, eq(representatives.id, voters.representativeId))
        .groupBy(representatives.id, representatives.name);
      return representativeVotes;
    },

    async getAllVotesforRepresentativ(representativeId: string) {
      const representativeInfo = await db
        .select({ count: sql<number>`count(*)` })
        .from(representatives)
        .where(eq(representatives.id, representativeId))
        .leftJoin(voters, eq(representatives.id, voters.representativeId));

      return representativeInfo;
    },

    async addRepresentative(representative: NewRepresentative) {
      await db.insert(representatives).values(representative);
    },

    async updateVoterRepresentative(id: string, representativeId: string) {
      await db
        .update(voters)
        .set({ representativeId: representativeId })
        .where(eq(voters.id, id));
    },

    async addVoter(voterData: NewVoter) {
      await db.insert(voters).values(voterData);
    },
  };
}
