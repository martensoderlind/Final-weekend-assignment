import { db } from "@/index";
import { createService } from "./service";
import { representativeService } from "../representatives/instance";

export const voteService = createService(
  db,
  representativeService.representativeVotes,
  representativeService.getVoter,
  representativeService.getRepresentative,
  representativeService.getAllRepresentatives,
  representativeService.getAllVoters
);
