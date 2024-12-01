import { Db } from "@/index";
import {
  NewElection,
  NewElectionAlternative,
  NewVote,
  SeedElection,
} from "./types";
import { electionVoteAlternatives, elections, votes } from "./db/schema";
import { eq, and, sql } from "drizzle-orm";

export function createRepository(db: Db) {
  return {
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
    async getAllVoters(representativeId: string, electionId: string) {
      const voter = await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(
          and(
            eq(votes.representativeId, representativeId),
            eq(votes.electionId, electionId)
          )
        );
      return voter;
    },
    async getAllVotes(representativeId: string) {
      const voter = await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(and(eq(votes.representativeId, representativeId)));
      return voter;
    },

    async getAllActiveElections() {
      const activeElections = await db
        .select()
        .from(elections)
        .where(eq(elections.active, true));
      return activeElections;
    },

    async getAllConcludedElections() {
      const concludedElections = await db
        .select()
        .from(elections)
        .where(eq(elections.active, false));
      return concludedElections;
    },

    async getVoteAlternatives(id: string) {
      const uniqueVoteAlternatives = await db
        .select({
          id: electionVoteAlternatives.id,
          electionId: electionVoteAlternatives.electionId,
          choice: electionVoteAlternatives.choice,
          votes: sql<number>`count(DISTINCT ${votes.id})`,
        })
        .from(electionVoteAlternatives)
        .where(eq(electionVoteAlternatives.electionId, id))
        .leftJoin(votes, eq(electionVoteAlternatives.id, votes.choice))
        .groupBy(
          electionVoteAlternatives.id,
          electionVoteAlternatives.electionId,
          electionVoteAlternatives.choice
        );
      return uniqueVoteAlternatives;
    },
    async getElectionAlternatives(electionId: string) {
      return await db
        .select()
        .from(electionVoteAlternatives)
        .where(eq(electionVoteAlternatives.electionId, electionId));
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
      representativeId: string
    ) {
      const representativeVote = await db
        .select()
        .from(votes)
        .where(
          and(
            eq(votes.electionId, electionId),
            eq(votes.voterId, representativeId)
          )
        );
      return representativeVote;
    },
    async getVoteCount(representativeId: string) {
      return await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(and(eq(votes.representativeId, representativeId)));
    },
    async addElectionAlternative(alternative: NewElectionAlternative) {
      await db.insert(electionVoteAlternatives).values(alternative);
    },

    async addElection(newElection: NewElection) {
      await db.insert(elections).values(newElection);
    },
    async addVote(vote: NewVote) {
      await db.insert(votes).values(vote);
    },
    async getVote(electionId: string, voterId: string) {
      const electionVotes = await db
        .select()
        .from(votes)
        .where(
          and(eq(votes.electionId, electionId), eq(votes.voterId, voterId))
        );

      return electionVotes;
    },

    async concludeVote(electionId: string) {
      await db
        .update(elections)
        .set({ active: false, concluded: new Date() })
        .where(eq(elections.id, electionId));
    },

    async seedElections(electionData: SeedElection[]) {
      await db.insert(elections).values(electionData);
    },
    async seedElectionAlternative(alternative: NewElectionAlternative[]) {
      await db.insert(electionVoteAlternatives).values(alternative);
    },
    async seedVotes(votesData: NewVote[]) {
      await db.insert(votes).values(votesData);
    },
    async getRepresentativesForAlternative(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      return await db
        .select()
        .from(votes)
        .where(
          and(
            eq(votes.electionId, electionId),
            eq(votes.voterId, representativeId),
            eq(votes.choice, choice)
          )
        );
    },
    async getPartisipatingElections(representativeId: string) {
      return await db
        .select()
        .from(votes)
        .where(eq(votes.voterId, representativeId));
    },
  };
}
