import { createRepository } from "./repository";
import {
  Count,
  NewRepresentative,
  NewVoter,
  RepresentativeInformation,
  Vote,
  Voters,
} from "./types";
import { Db } from "@/index";
import { representativSchema } from "./validation";
import { randomUUID, UUID } from "crypto";
import { user } from "./db/mockUser";
import { representativeService } from "./instance";

export function createService(
  db: Db,
  getVoteFromVoter: (electionId: string, voterId: string) => Promise<Vote[]>,
  getVotingRepresentatives: (
    electionId: string,
    representativeId: string
  ) => Promise<Vote[]>,
  getAllVotersThatAgree: (
    representativeId: string,
    electionId: string,
    choice: string
  ) => Promise<Voters[]>,
  getAllVotesfromRepresentativ: (representativeId: string) => Promise<Voters>,
  getVotesFromVoters: (
    representative: RepresentativeInformation,
    representativeVotes: Count
  ) => Promise<number>
) {
  const repository = createRepository(db);

  return {
    async getAllRepresentatives() {
      const representatives = await repository.getAllRepresentatives();
      return representatives;
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

    async getRepresentativeInformation() {
      return await repository.getRepresentativeInformation();
    },

    async representativeVotes(representativeId: string) {
      return await repository.getAllVotesforRepresentativ(representativeId);
    },

    async getVotingRepresentatives(electionId: string, alternative: string) {
      const representatives = await repository.getAllRepresentatives();
      const votingRepresentatives = [];
      let representativesVote;
      for (let i = 0; i < representatives.length; i++) {
        representativesVote = await getVotingRepresentatives(
          electionId,
          representatives![i].id
        );
        if (representativesVote.length === 1) {
          if (alternative === representativesVote[0].choice) {
            const representative = {
              ...representativesVote[0],
              name: representatives[i].name,
            };
            votingRepresentatives.push(representative);
          }
        }
      }
      return votingRepresentatives;
    },

    //skrivas om??
    async controllVote(electionId: string) {
      const voter = await representativeService.getVoter(user.id);
      const votes = await getVoteFromVoter(electionId, voter[0].id);

      for (let i = 0; i < votes.length; i++) {
        if (voter[0].id === votes[i].voterId) return true;
      }
      return false;
    },

    async voterAgreement(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      const representativeVoters = await repository.getAllVotesforRepresentativ(
        representativeId
      );
      const votersThatAgree = await getAllVotersThatAgree(
        representativeId,
        electionId,
        choice
      );
      if (representativeVoters[0].count === 0) return 0;
      return (
        Math.floor(votersThatAgree[0].count / representativeVoters[0].count) *
        100
      );
    },

    async getAllVotesfromRepresentativ(representativeId: string) {
      return await getAllVotesfromRepresentativ(representativeId);
    },
    //skrivas om
    async getVotesFromVoters(
      representative: RepresentativeInformation,
      representativeVotes: Count
    ) {
      return await getVotesFromVoters(representative, representativeVotes);
    },

    async addVoter(voterData: NewVoter) {
      await repository.addVoter(voterData);
    },
  };
}
