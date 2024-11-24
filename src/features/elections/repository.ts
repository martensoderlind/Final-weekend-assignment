import { Db } from "@/index";
import { Representatives } from "./fixtures/mockdb";
import {
  NewElection,
  NewElectionAlternative,
  RepresentativeInformation,
} from "./types";
import {
  electionVoteAlternatives,
  elections,
  representatives,
  voters,
  votes,
} from "./db/schema";
import { eq, and } from "drizzle-orm";

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
        .select({ voteAlternatives: electionVoteAlternatives.choice })
        .from(electionVoteAlternatives)
        .where(eq(electionVoteAlternatives.electionId, id))
        .groupBy(electionVoteAlternatives.choice);
      return uniqueVoteAlternatives;
    },
    async addVote(vote: NewElectionAlternative) {
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
