import React from "react";
import { ElectionAlternatives } from "../fixtures/mockdb";
import { chatService } from "../instance";

export default function VoteOptions({
  alternative,
}: {
  alternative: ElectionAlternatives;
}) {
  async function onClick() {
    "use server";
    const voter = await chatService.getVoter(
      "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9"
    );
    const vote = {
      electionId: alternative.electionId,
      voterId: voter!.id,
      choice: alternative.choice,
    };
    await chatService.addVote(vote);
  }
  return (
    <div className="flex flex-row mt-2 justify-between">
      <h3 className="p-1 mr-2">{alternative.choice}</h3>
      <button className="btn btn-sm rounded-md" onClick={onClick}>
        Vote
      </button>
    </div>
  );
}
