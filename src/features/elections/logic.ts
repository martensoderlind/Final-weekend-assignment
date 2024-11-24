import { Alternative } from "./types";

export function winnerOfElection(alternatives: Alternative[]) {
  const winner = alternatives.reduce(
    (max, current) => (current.votes > max.votes ? current : max),
    alternatives[0]
  );
  return winner ? winner : "there was no winner of this election";
}
