import { Representatives } from "./fixtures/mockdb";
import { createRepository } from "./repository";
import { v4 as uuidv4 } from "uuid";
import {
  ElectionVote,
  RepresentativeInformation,
  RepresentativeVote,
  representativeVote,
} from "./types";

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
    async getVoter(id: string) {
      return await repository.getAllVoterById(id);
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
        id: uuidv4(),
        electionId: electionId,
        voterId: null,
        representativeId: null,
        choice: voteAlternative,
      };
      await repository.addVote(vote);
    },
    async controllVote(electionId: string, voterId: string) {
      const votes = await repository.getAllElectionAlternativesByElectionId(
        electionId
      );

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
        id: uuidv4(),
        subject: electionSubject,
        created: new Date().toISOString().split("T")[0],
        concluded: null,
        active: true,
      };
      await repository.createElection(newElection);
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
    async voterAgreement(
      representative: RepresentativeVote,
      electionId: string
    ) {
      const votersInElection =
        await repository.getAllElectionAlternativesByElectionId(electionId);
      let votersThatAgree: number;
      for (let i = 0; i < votersInElection.length; i++) {
        if (votersInElection.representativeId === representative.id) {
        }
      }
      return votersThatAgree / representative.voters;
    },
  };
}
