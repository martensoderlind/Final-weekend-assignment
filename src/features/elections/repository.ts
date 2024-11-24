import { Db } from "@/index";
import { Representatives } from "./fixtures/mockdb";
import {
  NewElection,
  NewElectionAlternative,
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
    async getAllVoters() {
      return await db.select().from(voters);
    },
    async getAllVotersById(id: string) {
      const voter = await db.select().from(voters).where(eq(voters.id, id));
      return voter;
    },
    async getAllVoterforRepresentativ(representativeId: string) {
      const voter = await db
        .select({ count: sql<number>`count(*)` })
        .from(voters)
        .where(eq(voters.id, representativeId));
      return voter;
    },
    async getAllVotersThatAgree(representativeId: string, choice: string) {
      const voter = await db
        .select({ count: sql<number>`count(*)` })
        .from(votes)
        .where(
          and(
            eq(votes.representativeId, representativeId),
            eq(votes.choice, choice)
          )
        );
      return voter;
    },
    async createRepresentative(representative: Representatives) {
      await db.insert(representatives).values(representative);
    },
    async createElection(newElection: NewElection) {
      await db.insert(elections).values(newElection);
    },
    async updateVoterRepresentative(id: string, representativeId: string) {
      await db
        .update(voters)
        .set({ representativeId: representativeId })
        .where(eq(voters.id, id));
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
        .select()
        .from(electionVoteAlternatives)
        .where(eq(electionVoteAlternatives.electionId, id));
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
      console.log("election votes", electionVotes);
      return { votedInElection: false, votedOn: null };
    },
  };
}
