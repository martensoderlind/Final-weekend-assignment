import { createRepository } from "./repository";
import {
  Alternative,
  Count,
  Representative,
  RepresentativeInformation,
  Vote,
  Voter,
} from "./types";
import { Db } from "@/index";
import {
  calculatePerecentage,
  randomDate,
  sample,
  winnerOfElection,
} from "./logic";
import { user } from "./fixtures/mockdb";
import { electionSchema } from "./validation";
import { randomUUID, UUID } from "crypto";
import { voteService } from "./instance";

export function createService(
  db: Db,
  representativeVotes: (representativeId: string) => Promise<Count[]>,
  getVoter: (id: string) => Promise<Voter[]>,
  getRepresentative: (id: string) => Promise<Representative[]>,
  getAllRepresentatives: () => Promise<Representative[]>
) {
  const repository = createRepository(db);

  return {
    async getAllActiveElections() {
      return await repository.getAllActiveElections();
    },

    async getAllConcludedElections() {
      return await repository.getAllConcludedElections();
    },
    async getVoteAlternatives(id: string) {
      const alternatives = await repository.getVoteAlternatives(id);
      return alternatives;
    },
    async getAllRepresentatives() {
      return await getAllRepresentatives();
    },

    async getElectionAlternatives(electionId: string) {
      return await repository.getVoteAlternatives(electionId);
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
        const voter = await getVoter(user.id);
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
      const voter = await getVoter(user.id);
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
    async getRatioOfVotersThatAgree(
      representativeId: string,
      electionId: string,
      choice: string
    ) {
      const totalVoter = await repository.getAllVoters(
        representativeId,
        electionId
      );
      const votersThatAgree = await repository.getAllVotersThatAgree(
        representativeId,
        electionId,
        choice
      );
      return (votersThatAgree[0].count / totalVoter[0].count) * 100;
    },
    async getTotalRatioOfVotersThatAgree(representativeId: string) {
      const totalVoter = await repository.getAllVotes(representativeId);
      const elections = await repository.getPartisipatingElections(
        representativeId
      );

      let amountOfVotersThatAgree = 0;
      for (let i = 0; i < elections.length; i++) {
        const votersThatAgree = await repository.getAllVotersThatAgree(
          representativeId,
          elections[i].electionId,
          elections[i].choice!
        );
        amountOfVotersThatAgree =
          Number(amountOfVotersThatAgree) + Number(votersThatAgree[0].count);
      }
      return parseInt(
        (100 * (amountOfVotersThatAgree / totalVoter[0].count)).toFixed(0)
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
      const votes = await repository.getVoteCount(representative.id);
      return calculatePerecentage(
        votes[0],
        representative,
        representativeVotes
      );
    },

    async getVoteFromVoter(electionId: string, voterId: string) {
      return await repository.getVote(electionId, voterId);
    },
    async representativeVotes(representativeId: string) {
      const vote = await representativeVotes(representativeId);
      return vote;
    },
    async getRepresentative(representativeId: string) {
      return await getRepresentative(representativeId);
    },

    async votedForTheAlternative(electionId: string, choice: string) {
      const representatives = await getAllRepresentatives();
      const votingRepresentatives: Vote[] = [];
      let vote = [];
      for (let i = 0; i < representatives.length; i++) {
        vote = [];
        vote = await repository.getRepresentativesForAlternative(
          representatives[i].id,
          electionId,
          choice
        );
        if (vote.length !== 0) {
          votingRepresentatives.push(vote[0]);
        }
      }
      return votingRepresentatives;
    },
    getRandomDate(years: number) {
      return randomDate(years);
    },
    sampleData<T>(data: T[]) {
      return sample(data);
    },
    async getTotalVotes(votingRepresentatives: Vote[]) {
      let totalVotes = 0;
      for (let i = 0; i < votingRepresentatives.length; i++) {
        const votes = await voteService.representativeVotes(
          votingRepresentatives[i].representativeId!
        );
        totalVotes = Number(totalVotes) + Number(votes[0].count);
      }
      return totalVotes;
    },
  };
}
