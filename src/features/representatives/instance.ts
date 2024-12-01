import { db } from "@/index";
import { createService } from "./service";
import { voteService } from "../elections/instance";

export const representativeService = createService(
  db,
  voteService.getVoteFromVoter,
  voteService.getVotingRepresentatives,
  voteService.getAllVotersThatAgree,
  voteService.getAllVotesfromRepresentativ,
  voteService.getVotesFromVoters
);
