import { Count, RepresentativeInformation } from "./types";

export function calculatePerecentage(
  votes: Count,
  representative: RepresentativeInformation,
  representativeVotes: Count
) {
  return Math.floor(
    (votes.count / (representative.votes * representativeVotes.count)) * 100
  );
}
export const randomDateInLastYears = (years: number) => {
  const end = new Date();
  const start = new Date();
  start.setFullYear(end.getFullYear() - years);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

export const sample = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
