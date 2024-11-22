import { createRepository } from "./repository";

export function createService() {
  const repository = createRepository();

  return {
    async getAllRepresentativs() {
      return await repository.getAllRepresentativs();
    },
  };
}
