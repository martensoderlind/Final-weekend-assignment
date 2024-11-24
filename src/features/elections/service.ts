import { Representatives } from "./fixtures/mockdb";
import { createRepository } from "./repository";
import { v4 as uuidv4 } from "uuid";
import { ElectionVote } from "./types";
import { z } from "zod";
import { Db } from "@/index";

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
      const representative: Representatives = {
        id: uuidv4(),
        name: name,
        email: email,
      };
      const result = representativSchema.safeParse(representative);
      if (result.success) {
        await repository.createRepresentative(representative);
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
      return await repository.getVoteAlternatives(id);
    },
    async getRepresentativeInformation() {
      return await repository.getRepresentativeInformation();
    },
    async representativeVoters(representativeId: string) {
      return await repository.getAllVoterforRepresentativ(representativeId);
    },
    async getVotingRepresentatives(electionId: string) {
      const representatives = await repository.getAllRepresentatives();
      console.log(representatives);
      const votingRepresentatives = [];

      for (let i = 0; i < representatives.length; i++) {
        if (
          await repository.getVotingRepresentatives(
            electionId,
            representatives![i]
          )
        ) {
          votingRepresentatives.push(representatives[i]);
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
      //har personen röstat?
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
        await repository.createElection(newElection);
      }
    },
    async voterAgreement(representativeId: string, choice: string) {
      const representativeVoters = await repository.getAllVoterforRepresentativ(
        representativeId
      );
      const votersThatAgree = await repository.getAllVotersThatAgree(
        representativeId,
        choice
      );
      return (
        Math.floor(votersThatAgree[0].count / representativeVoters[0].count) *
        100
      );
    },
  };
}
