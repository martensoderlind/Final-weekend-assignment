import { Representatives, representatives } from "./fixtures/mockdb";

export function createRepository() {
  return {
    async getAllRepresentatives() {
      return representatives;
    },
    async createRepresentative(representative: Representatives) {
      representatives.push(representative);
    },
  };
}
