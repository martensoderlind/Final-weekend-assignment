import { describe, it } from "node:test";
import { winnerOfElection } from "../logic";
import { deepEqual } from "node:assert";
import { Alternative } from "../types";

describe("winner of elections", () => {
  it("should return message", () => {
    const alternatives: Alternative[] = [];
    const result = winnerOfElection(alternatives);
    deepEqual(result, "there was no winner of this election");
  });
  it("Should return the only alternative", () => {
    const alternatives: Alternative[] = [
      {
        electionId: "2",
        id: "2",
        choice: "2",
        votes: 1,
      },
    ];
    const result = winnerOfElection(alternatives);
    deepEqual(result, {
      electionId: "2",
      id: "2",
      choice: "2",
      votes: 1,
    });
  });
  it("Should return the bigger alternative", () => {
    const alternatives: Alternative[] = [
      {
        electionId: "1",
        id: "1",
        choice: "1",
        votes: 2,
      },
      {
        electionId: "2",
        id: "2",
        choice: "2",
        votes: 1,
      },
    ];
    const result = winnerOfElection(alternatives);
    deepEqual(result, {
      electionId: "1",
      id: "1",
      choice: "1",
      votes: 2,
    });
  });
});
