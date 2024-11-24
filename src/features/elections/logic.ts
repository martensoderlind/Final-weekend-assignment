import { Alternative, Count, RepresentativeInformation } from "./types";

export function winnerOfElection(alternatives: Alternative[]) {
  const winner = alternatives.reduce(
    (max, current) => (current.votes > max.votes ? current : max),
    alternatives[0]
  );
  return winner;
}

export function calculatePerecentage(
  votes: Count,
  representative: RepresentativeInformation,
  representativeVotes: Count
) {
  return Math.floor(
    (votes.count / (representative.votes * representativeVotes.count)) * 100
  );
}
