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
  id: "0416b787-df97-405c-aa05-0062e5293ab2",
};
