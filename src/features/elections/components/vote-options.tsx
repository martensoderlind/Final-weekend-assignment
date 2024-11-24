import React from "react";
import { castVote } from "../actions";

type Props = {
  alternative: string;
  haveVoted: boolean;
  electionId: string;
};

export default async function VoteOptions({
  alternative,
  haveVoted,
  electionId,
}: Props) {
  async function onClick() {
    "use server";
    await castVote(alternative, electionId);
  }
  return (
    <div className="flex flex-row mt-2 justify-between">
      <h3 className="p-1 mr-2">{alternative}</h3>
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
