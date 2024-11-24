import { Db } from "@/index";
import {
  NewElection,
  NewElectionAlternative,
  NewRepresentative,
  NewVote,
  Representative,
  RepresentativeInformation,
} from "./types";
import {
  electionVoteAlternatives,
  elections,
  representatives,
  voters,
  votes,
} from "./db/schema";
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
        return { count: "No votes made" };
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

    async addVote(vote: NewVote) {
      await db.insert(votes).values(vote);
    },

    async addElectionAlternative(alternative: NewElectionAlternative) {
      await db.insert(electionVoteAlternatives).values(alternative);
    },

    async addRepresentative(representative: NewRepresentative) {
      await db.insert(representatives).values(representative);
    },

    async addElection(newElection: NewElection) {
      await db.insert(elections).values(newElection);
    },

    async updateVoterRepresentative(id: string, representativeId: string) {
      await db
        .update(voters)
        .set({ representativeId: representativeId })
        .where(eq(voters.id, id));
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

    async votedInElection(
      electionId: string,
      representativeInformation: RepresentativeInformation
    ) {
      const electionVotes = await db
        .select()
        .from(votes)
        .where(
          and(
            eq(votes.electionId, electionId),
            eq(votes.voterId, representativeInformation.id)
          )
        );
      if (!electionVotes) {
        return { votedInElection: false, votedOn: null };
      }
      return { votedInElection: false, votedOn: null };
    },
  };
}
