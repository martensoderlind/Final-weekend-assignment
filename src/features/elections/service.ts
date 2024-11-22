import { Representatives } from "./fixtures/mockdb";
import { createRepository } from "./repository";
import { v4 as uuidv4 } from "uuid";

export function createService() {
  const repository = createRepository();

  return {
    async getAllRepresentatives() {
      const representatives = await repository.getAllRepresentatives();

      return representatives;
    },
    async getRepresentativeInformation() {
      const voters = await repository.getAllVoters();
      const representatives = await repository.getAllRepresentatives();
      const votesPerRepresentative = [];
      let count = 0;
      for (let i = 0; i < representatives.length; i++) {
        count = 0;
        for (let j = 0; j < voters.length; j++) {
          if (voters[j].representativeId === representatives[i].id) {
            count = count + 1;
          }
        }
        votesPerRepresentative.push({
          id: representatives[i].id,
          name: representatives[i].name,
          voters: count,
        });
      }

      return votesPerRepresentative;
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
    async updateVoterRepresentative(id: string, representativeId: string) {
      await repository.updateVoterRepresentative(id, representativeId);
    },
  };
}
