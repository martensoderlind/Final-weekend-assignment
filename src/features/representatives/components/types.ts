import { UUID } from "crypto";

export type Count = {
  count: number;
};
export type NewRepresentative = {
  name: string;
  email: string;
  id?: string;
};
export type RepresentativeInformation = {
  id: string;
  name: string;
  votes: number;
};
export type NewVoter = {
  id: UUID;
  representativeId: UUID;
  voteDate: Date;
};
export type Representative = {
  name: string;
  email: string;
  id: string | UUID;
};