import { Representatives } from "./fixtures/mockdb";
import { createRepository } from "./repository";
import { v4 as uuidv4 } from "uuid";

export function createService() {
  const repository = createRepository();

  return {
    async getAllRepresentatives() {
      return await repository.getAllRepresentatives();
    },
    async emailIsUnique(email: string) {
      const allEmails = await repository.getAllRepresentatives();
      for (let i = 0; i < allEmails.length; i++) {
        if (email === allEmails[i].email) return false;
      }
      return true;
    },
    async createNewRepresentative(name: string, email: string) {
      const representative: Representatives = {
        id: uuidv4(),
        name: name,
        email: email,
      };
      await repository.createRepresentative(representative);
    },
  };
}
