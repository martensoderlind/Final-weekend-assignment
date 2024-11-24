import { Representatives } from "./fixtures/mockdb";
import { createRepository } from "./repository";
import { v4 as uuidv4 } from "uuid";
import { ElectionVote, RepresentativeInformation } from "./types";
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
    async addVote(electionVote: ElectionVote, representativeId: string) {
      const vote = {
        id: uuidv4(),
        electionId: electionVote.electionId,
        voterId: electionVote.voterId,
        representativeId: representativeId,
        choice: electionVote.choice,
      };
      await repository.addVote(vote);
    },
    async addElectionOption(electionId: string, voteAlternative: string) {
      const vote = {
        electionId: electionId,
        choice: voteAlternative,
      };
      await repository.addVote(vote);
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
    async getElectionResult(
      representativeInformation: RepresentativeInformation[],
      electionId: string,
      choice: string
    ) {
      const electionResult = [];
      for (let i = 0; i < representativeInformation.length; i++) {
        const votedInElection = await repository.votedInElection(
          electionId,
          representativeInformation[i]
        );

        if (
          votedInElection.votedInElection &&
          votedInElection.votedOn === choice
        ) {
          const representativeVote = {
            id: representativeInformation[i].id,
            name: representativeInformation[i].name,
            voters: representativeInformation[i].voters,
            votedinElection: votedInElection.votedInElection,
            votedOn: votedInElection.votedOn,
          };
          electionResult.push(representativeVote);
        }
      }
      return electionResult;
    },
    // async voterAgreement(
    //   representative: RepresentativeVote,
    //   electionId: string
    // ) {
    //   //skriv om
    //   //hur många har röstat samma som representanten

    //   // return Math.floor((votersThatAgree / totalVoterForRepresentativ) * 100);
    //   return 100;
    // },
    // async getElectionWinner(electionId: string) {
    //   //skriv om
    //   return;
    // },
  };
}
