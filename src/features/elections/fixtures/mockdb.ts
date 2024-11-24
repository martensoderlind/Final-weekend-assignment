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
  id: "57977e27-f576-4d2e-89ab-90414b42649c",
};
