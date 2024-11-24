import { Db } from "@/index";
import {
  Election,
  ElectionAlternatives,
  electionAlternatives,
  elections,
  Representatives,
} from "./fixtures/mockdb";
import { RepresentativeInformation } from "./types";
import { representatives, voters } from "./db/schema";
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
    async createElection(newElection: Election) {
      elections.push(newElection);
    },
    async updateVoterRepresentative(id: string, representativeId: string) {
      const voterToUpdate = voters.find((voter) => voter.id === id);
      voterToUpdate!.representativeId = representativeId;
      console.log("updated representative");
    },
    async getAllActiveElections() {
      const activeElections = elections.filter((election) => {
        return election.active === true;
      });
      return activeElections;
    },
    async getAllConcludedElections() {
      const activeElections = elections.filter((election) => {
        return election.active === false;
      });
      return activeElections;
    },
    async getVoteAlternatives(id: string) {
      const voteAlternatives = electionAlternatives.filter((alternatives) => {
        return alternatives.electionId === id;
      });
      const uniqueVoteAlternatives = voteAlternatives.filter(
        (alternative, index, self) =>
          index === self.findIndex((t) => t.choice === alternative.choice)
      );

      return uniqueVoteAlternatives;
    },
    async addVote(vote: ElectionAlternatives) {
      electionAlternatives.push(vote);
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
