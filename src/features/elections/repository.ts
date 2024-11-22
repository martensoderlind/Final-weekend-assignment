import { Representatives, representatives, voters } from "./fixtures/mockdb";

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
  };
}
