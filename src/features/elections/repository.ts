import { Representatives, representatives, voters } from "./fixtures/mockdb";

export function createRepository() {
  return {
    async getAllRepresentatives() {
      return representatives;
    },
    async getAllVoters() {
      return voters;
    },
    async createRepresentative(representative: Representatives) {
      representatives.push(representative);
    },
  };
}
