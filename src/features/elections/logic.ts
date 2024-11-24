import { Alternative } from "./types";

export function winnerOfElection(alternatives: Alternative[]) {
  return alternatives.reduce(
    (max, current) => (current.votes > max.votes ? current : max),
    alternatives[0]
  );
}
