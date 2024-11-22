import {
  electionAlternatives,
  elections,
  Representatives,
  representatives,
  voters,
} from "./fixtures/mockdb";

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
    async updateVoterRepresentative(id: string, representativeId: string) {
      const voterToUpdate = voters.find((voter) => voter.id === id);
      voterToUpdate!.representativeId = representativeId;
      console.log("updated representative");
    },
    async getAllActiveElections() {
      const activeElections = elections.filter((election) => {
        return election.status === true;
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
  };
}
