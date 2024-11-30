import { Db } from "@/index";
import { NewRepresentative, NewVoter, Representative } from "./types";
import { representatives, voters } from "../db/schema";
import { eq, and, sql } from "drizzle-orm";

export function createRepository(db: Db) {
  return {
    async getAllRepresentatives() {
      return await db.select().from(representatives);
    },

    async getAllVotersById(id: string) {
      const voter = await db.select().from(voters).where(eq(voters.id, id));
      return voter;
    },

    async getAllVotersThatAgree(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      const voter = await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(
          and(
            eq(votes.representativeId, representativeId),
            eq(votes.electionId, electionId),
            eq(votes.choice, choice)
          )
        );
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
    async getAllVotesfromRepresentativ(representativeId: string) {
      const representativeVotes = await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(eq(votes.voterId, representativeId));

      if (representativeVotes[0].count === 0) {
        return { count: 0 };
      }
      return representativeVotes[0];
    },

    async getVotingRepresentatives(
      electionId: string,
      representative: Representative
    ) {
      const representativeVote = await db
        .select()
        .from(votes)
        .where(
          and(
            eq(votes.electionId, electionId),
            eq(votes.voterId, representative.id)
          )
        );
      return representativeVote;
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

    async getRepresentativesThatVoted(
      electionId: string,
      alternativeId: string
    ) {
      const representativVoters = await db
        .select()
        .from(votes)
        .where(
          and(eq(votes.electionId, electionId), eq(votes.choice, alternativeId))
        );
      return representativVoters;
    },

    async getVoterCount(representativeId: string) {
      return await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(and(eq(votes.representativeId, representativeId)));
    },

    async seedRepresentative(representative: Representative[]) {
      await db.insert(representatives).values(representative);
    },

    async seedVoters(voterData: NewVoter[]) {
      await db.insert(voters).values(voterData);
    },
  };
}
