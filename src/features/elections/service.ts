import { createRepository } from "./repository";
import { Alternative, ElectionVote, NewRepresentative } from "./types";
import { z } from "zod";
import { Db } from "@/index";
import { winnerOfElection } from "./logic";

const representativSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
const electionSchema = z.object({
  subject: z.string(),
  created: z.date(),
  active: z.boolean(),
});

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

    async createNewRepresentative(name: string, email: string) {
      const representative: NewRepresentative = {
        name: name,
        email: email,
      };
      const result = representativSchema.safeParse(representative);
      if (result.success) {
        await repository.addRepresentative(representative);
      }
    },

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

    async representativeVotes(representativeId: string) {
      return await repository.getAllVotesforRepresentativ(representativeId);
    },

    async getVotingRepresentatives(electionId: string, alternative: string) {
      const representatives = await repository.getAllRepresentatives();
      const votingRepresentatives = [];
      let representativesVote;
      for (let i = 0; i < representatives.length; i++) {
        representativesVote = await repository.getVotingRepresentatives(
          electionId,
          representatives![i]
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

    async addVote(electionVote: ElectionVote, representativeId: string) {
      const vote = {
        electionId: electionVote.electionId,
        voterId: electionVote.voterId,
        representativeId: representativeId,
        choice: electionVote.choice,
      };
      await repository.addVote(vote);
    },

    async addElectionOption(electionId: string, voteAlternative: string) {
      const alternative = {
        electionId: electionId,
        choice: voteAlternative,
      };
      await repository.addElectionAlternative(alternative);
    },

    async controllVote(electionId: string, voterId: string) {
      const votes = await repository.getVote(electionId, voterId);

      for (let i = 0; i < votes.length; i++) {
        if (voterId === votes[i].voterId) return true;
      }
      return false;
    },

    async concludeVote(electionId: string) {
      await repository.concludeVote(electionId);
    },

    async createElection(electionSubject: string) {
      const newElection = {
        subject: electionSubject,
        created: new Date(),
        active: true,
      };

      const result = representativSchema.safeParse(electionSchema);
      if (result.success) {
        await repository.addElection(newElection);
      }
    },

    async voterAgreement(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      //retunerar rätt
      const representativeVoters = await repository.getAllVotesforRepresentativ(
        representativeId
      );
      const votersThatAgree = await repository.getAllVotersThatAgree(
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

    async electionWinner(alternatives: Alternative[]) {
      // const representativeVoters = await repository.getAllVotesforRepresentativ(
      //   representativeId
      // );
      return winnerOfElection(alternatives);
    },

    async getAllVotesfromRepresentativ(representativeId: string) {
      return await repository.getAllVotesfromRepresentativ(representativeId);
    },
  };
}
