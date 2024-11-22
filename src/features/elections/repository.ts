import { representativs } from "./fixtures/mockdb";

export function createRepository() {
  return {
    async getAllRepresentativs() {
      return representativs;
    },
  };
}
