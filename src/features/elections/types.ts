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
