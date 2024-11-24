export type ElectionVote = {
  electionId: string;
  voterId: string;
  choice: string;
};

export type RepresentativeInformation = {
  id: string;
  name: string;
  voters: number;
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
