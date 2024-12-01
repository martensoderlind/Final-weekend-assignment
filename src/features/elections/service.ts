import { createRepository } from "./repository";
import { Alternative, Count, RepresentativeInformation } from "./types";
import { Db } from "@/index";
import { calculatePerecentage, winnerOfElection } from "./logic";
import { voteService } from "./instance";
import { user } from "./fixtures/mockdb";
import { electionSchema } from "./validation";
import { randomUUID, UUID } from "crypto";

export function createService(db: Db) {
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

    // async createNewRepresentative(name: string, email: string) {
    //   const uniqueEmail = await voteService.emailIsUnique(email);
    //   if (uniqueEmail) {
    //     const representative: NewRepresentative = {
    //       name: name,
    //       email: email,
    //     };
    //     const result = representativSchema.safeParse(representative);
    //     if (result.success) {
    //       await repository.addRepresentative(representative);
    //     }
    //   }
    // },

    async updateVoterRepresentative(id: string, representativeId: string) {
      await repository.updateVoterRepresentative(id, representativeId);
    },

    async getVoter(id: string) {
      return await repository.getAllVotersById(id);
    },

    async getAllActiveElections() {
      return await repository.getAllActiveElections();
    },

    async getAllConcludedElections() {
      return await repository.getAllConcludedElections();
    },

    async getVoteAlternatives(id: string) {
      const alternatives = await repository.getVoteAlternatives(id);
      let votes = 0;
      for (let i = 0; i < alternatives.length; i++) {
        votes = 0;
        const representatives = await repository.getRepresentativesThatVoted(
          alternatives[i].electionId,
          alternatives[i].id
        );
        for (let j = 0; j < representatives.length; j++) {
          const representativeVotes =
            await repository.getAllVotesforRepresentativ(
              representatives[j].voterId!
            );
          votes = votes + Number(representativeVotes[0].count);
        }
        alternatives[i].votes = votes;
      }
      return alternatives;
    },

    async getRepresentativeInformation() {
      return await repository.getRepresentativeInformation();
    },

    async getVotingRepresentatives(
      electionId: string,
      representativeId: string
    ) {
      return await repository.getVotingRepresentatives(
        electionId,
        representativeId
      );
    },

    async addVote(
      electionId: string,
      choiceId: string,
      id?: UUID,
      voterId?: UUID,
      representativeId?: UUID
    ) {
      if (!id) {
        const voter = await voteService.getVoter(user.id);
        if (voter.length > 0) {
          const vote = {
            electionId: electionId,
            voterId: voter[0]!.id,
            representativeId: voter[0].representativeId,
            choice: choiceId,
          };
          await repository.addVote(vote);
        }
      } else {
        const vote = {
          id: id,
          electionId: electionId,
          voterId: voterId!,
          representativeId: representativeId!,
          choice: choiceId!,
        };
        await repository.addVote(vote);
      }
    },

    async addElectionOption(electionId: string, voteAlternative: string) {
      const alternative = {
        electionId: electionId,
        choice: voteAlternative,
      };
      await repository.addElectionAlternative(alternative);
    },

    async controllVote(electionId: string) {
      const voter = await voteService.getVoter(user.id);
      const votes = await repository.getVote(electionId, voter[0].id);

      for (let i = 0; i < votes.length; i++) {
        if (voter[0].id === votes[i].voterId) return true;
      }
      return false;
    },

    async concludeVote(electionId: string) {
      await repository.concludeVote(electionId);
    },

    async createElection(
      electionSubject: string,
      id?: string,
      created?: Date,
      active?: boolean
    ) {
      const newElection = {
        id: id ? id : randomUUID(),
        subject: electionSubject,
        created: created ? created : new Date(),
        active: active ? active : true,
      };

      const result = electionSchema.safeParse(newElection);
      if (result.success) {
        await repository.addElection(newElection);
      }
    },

    async getAllVotersThatAgree(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      return await repository.getAllVotersThatAgree(
        representativeId,
        electionId,
        choice
      );
    },

    async electionWinner(alternatives: Alternative[]) {
      return winnerOfElection(alternatives);
    },

    async getAllVotesfromRepresentativ(representativeId: string) {
      return await repository.getAllVotesfromRepresentativ(representativeId);
    },
    async getVotesFromVoters(
      representative: RepresentativeInformation,
      representativeVotes: Count
    ) {
      const votes = await repository.getVoterCount(representative.id);
      return calculatePerecentage(
        votes[0],
        representative,
        representativeVotes
      );
    },
    async getVoteFromVoter(electionId: string, voterId: string) {
      return await repository.getVote(electionId, voterId);
    },
  };
}
