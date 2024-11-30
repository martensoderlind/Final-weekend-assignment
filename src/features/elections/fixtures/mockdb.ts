export type Election = {
  id: string;
  subject: string;
  created: Date;
  concluded: Date | null;
  active: boolean;
};
export type ElectionAlternatives = {
  id: string;
  electionId: string;
  voterId: string | null;
  representativeId: string | null;
  choice: string;
};

export type Representatives = {
  id: string;
  name: string;
  email: string;
};

export const user = {
  id: "0013bd8b-dda0-4776-b4fa-4bd53788d380",
};
