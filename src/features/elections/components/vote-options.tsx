import React from "react";
import { ElectionAlternatives } from "../fixtures/mockdb";
import { castVote } from "../actions";

type Props = {
  alternative: ElectionAlternatives;
  haveVoted: boolean;
};

export default async function VoteOptions({ alternative, haveVoted }: Props) {
  async function onClick() {
    "use server";
    await castVote(alternative);
  }
  return (
    <div className="flex flex-row mt-2 justify-between">
      <h3 className="p-1 mr-2">{alternative.choice}</h3>
      <button
        className="btn btn-sm rounded-md"
        disabled={haveVoted ? true : false}
        onClick={haveVoted ? undefined : onClick}
      >
        Vote
      </button>
    </div>
  );
}
