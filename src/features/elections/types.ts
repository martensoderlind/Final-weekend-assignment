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
  electionId: string;
  choice: string;
};
export type NewVote = {
  electionId: string;
  voterId: string;
  representativeId: string;
  choice: string;
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
  id: string;
};
export type NewRepresentative = {
  name: string;
  email: string;
};

export type VotingRepresentative = {
  name: string;
  id: string;
  electionId: string;
  voterId: string | null;
  representativeId: string | null;
  choice: string | null;
};
