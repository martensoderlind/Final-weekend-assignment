import { createRepository } from "./repository";
import {
  Count,
  NewRepresentative,
  NewVoter,
  RepresentativeInformation,
} from "./types";
import { Db } from "@/index";
import { representativSchema } from "./validation";
import { randomUUID, UUID } from "crypto";
import { representativeService } from "./instance";
import { randomDate, sample } from "../elections/logic";

export function createService(db: Db) {
  const repository = createRepository(db);

  let voteRatioMethod: ((id: string) => Promise<number>) | undefined;

  return {
    setVoteRatioMethod(method: (id: string) => Promise<number>) {
      voteRatioMethod = method;
    },

    async representativeAgreementRatio(representativeId: string) {
      if (!voteRatioMethod) {
        throw new Error("Vote ratio method not set");
      }
      return await voteRatioMethod(representativeId);
    },

    async getRepresentative(representativeId: string) {
      return await repository.getRepresentative(representativeId);
    },
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

    async createNewRepresentative(name: string, email: string, id?: UUID) {
      const uniqueEmail = await representativeService.emailIsUnique(email);
      if (uniqueEmail) {
        const representative: NewRepresentative = {
          id: id ? id : randomUUID(),
          name: name,
          email: email,
        };
        const result = representativSchema.safeParse(representative);
        if (result.success) {
          await repository.addRepresentative(representative);
        }
      }
    },

    async updateVoterRepresentative(id: string, representativeId: string) {
      await repository.updateVoterRepresentative(id, representativeId);
    },

    async getVoter(id: string) {
      return await repository.getAllVotersById(id);
    },

    async getAllVoters() {
      return await repository.getAllVoters();
    },

    async getRepresentativeInformation() {
      return await repository.getRepresentativeInformation();
    },

    async representativeVotes(representativeId: string) {
      return await repository.getAllVotesforRepresentativ(representativeId);
    },
    async getAllVotesfromRepresentativ() {
      return { count: 3 };
    },

    async getVotesFromVoters(
      representative: RepresentativeInformation,
      representativeVotes: Count
    ) {
      return (
        (Math.floor(Math.random() * 4) / representativeVotes.count) *
        100
      ).toFixed(0);
    },

    async addVoter(voterData: NewVoter) {
      await repository.addVoter(voterData);
    },
    getRandomDate(years: number) {
      return randomDate(years);
    },
    sampleData<T>(data: T[]) {
      return sample(data);
    },
  };
}
