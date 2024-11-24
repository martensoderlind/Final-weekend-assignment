import { Db } from "@/index";
import { ElectionAlternatives, Representatives } from "./fixtures/mockdb";
import {
  NewElection,
  NewElectionAlternative,
  RepresentativeInformation,
} from "./types";
import {
  electionAlternatives,
  elections,
  representatives,
  voters,
} from "./db/schema";
import { eq } from "drizzle-orm";

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
      // inte kontrollerad
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
        .select({ voteAlternatives: electionAlternatives.choice })
        .from(electionAlternatives)
        .where(eq(electionAlternatives.electionId, id));

      return uniqueVoteAlternatives;
    },
    async addVote(vote: NewElectionAlternative) {
      await db.insert(electionAlternatives).values(vote);
    },
    async getAllElectionAlternatives(electionId: string) {
      const votesOnElection = electionAlternatives.filter((vote) => {
        return vote.electionId === electionId;
      });
      return votesOnElection;
    },
    async concludeVote(electionId: string) {
      const currentElection = elections.find((election) => {
        return election.id === electionId;
      });
      currentElection!.active = false;
      currentElection!.concluded = new Date().toISOString().split("T")[0];
    },
    async votedInElection(
      electionId: string,
      representativeInformation: RepresentativeInformation
    ) {
      const electionVotes = electionAlternatives.filter((alternative) => {
        return alternative.electionId === electionId;
      });
      if (electionVotes.length === 0)
        return { votedInElection: false, votedOn: null };
      for (let i = 0; i < electionVotes.length; i++) {
        if (electionVotes[i].voterId === representativeInformation.id)
          return { votedInElection: true, votedOn: electionVotes[i].choice };
      }
      return { votedInElection: false, votedOn: null };
    },
  };
}
