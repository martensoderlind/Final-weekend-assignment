import {
  Election,
  ElectionAlternatives,
  electionAlternatives,
  elections,
  Representatives,
  representatives,
  voters,
} from "./fixtures/mockdb";
import { RepresentativeInformation } from "./types";

export function createRepository() {
  return {
    async getAllRepresentatives() {
      return representatives;
    },
    async getAllVoters() {
      return voters;
    },
    async getAllVoterById(id: string) {
      const voter = voters.find((voter) => voter.id === id);
      return voter;
    },
    async createRepresentative(representative: Representatives) {
      representatives.push(representative);
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
    async getAllElectionAlternativesByElectionId(electionId: string) {
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
