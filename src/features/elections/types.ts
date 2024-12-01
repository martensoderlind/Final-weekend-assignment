import { UUID } from "crypto";

export type ElectionVote = {
  electionId: string;
  voterId: string;
  choice: string;
};

export type RepresentativeInformation = {
  id: string;
  name: string;
  votes: number;
};

export type RepresentativeVote = {
  id: string;
  name: string;
  voters: number;
  votedinElection: boolean;
  votedOn: string;
};

export type NewElection = {
  subject: string;
  created: Date;
  active: boolean;
};
export type NewElectionAlternative = {
  id?: UUID;
  electionId: string;
  choice: string;
};
export type NewVote = {
  id?: UUID;
  electionId: string | UUID;
  voterId: string | UUID;
  representativeId: string | UUID;
  choice: string | UUID;
};

export type Alternative = {
  electionId: string;
  id: string;
  choice: string;
  votes: number;
};

export type Representative = {
  name: string;
  email: string;
  id: string | UUID;
};
export type NewRepresentative = {
  name: string;
  email: string;
  id?: UUID;
};

export type VotingRepresentative = {
  name: string;
  id: string;
  electionId: string;
  voterId: string | null;
  representativeId: string | null;
  choice: string | null;
};
export type Count = {
  count: number;
};

export type SeedElection = {
  id: UUID;
  subject: string;
  created: Date;
  concluded: Date | null;
  active: boolean;
};
export type NewVoter = {
  id: UUID;
  representativeId: UUID;
  voteDate: Date;
};
export type Voter = {
  id: string;
  representativeId: string;
  voteDate: Date;
};
export type Election = {
  id: string;
  subject: string;
  created: Date;
  concluded: Date | null;
  active: boolean;
};
