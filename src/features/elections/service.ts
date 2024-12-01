import { createRepository } from "./repository";
import { Alternative, Count, RepresentativeInformation, Voter } from "./types";
import { Db } from "@/index";
import { calculatePerecentage, winnerOfElection } from "./logic";
import { user } from "./fixtures/mockdb";
import { electionSchema } from "./validation";
import { randomUUID, UUID } from "crypto";

type Representative = {
  id: string;
  name: string;
  email: string;
};

export function createService(
  db: Db,
  representativeVotes: (representativeId: string) => Promise<Count[]>,
  getVoter: (id: string) => Promise<Voter[]>,
  getRepresentative: (id: string) => Promise<Representative[]>
) {
  const repository = createRepository(db);

  return {
    async getAllActiveElections() {
      return await repository.getAllActiveElections();
    },

    async getAllConcludedElections() {
      return await repository.getAllConcludedElections();
    },
    //kontrollera om logiken stämmer
    async getVoteAlternatives(id: string) {
      const alternatives = await repository.getVoteAlternatives(id);
      let votes = 0;
      for (let i = 0; i < alternatives.length; i++) {
        votes = 0;
        const representatives = await repository.getVotingRepresentatives(
          alternatives[i].electionId,
          alternatives[i].id
        );
        for (let j = 0; j < representatives.length; j++) {
          const representativeVote: Count[] = await representativeVotes(
            representatives[j].voterId!
          );
          votes = votes + Number(representativeVote[0].count);
        }
        alternatives[i].votes = votes;
      }
      return alternatives;
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
    async representativeVotes(representativeId: string) {
      return await representativeVotes(representativeId);
    },
    async getRepresentative(representativeId: string) {
      return await getRepresentative(representativeId);
    },
  };
}
