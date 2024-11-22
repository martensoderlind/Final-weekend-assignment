import React from "react";
import { ElectionAlternatives } from "../fixtures/mockdb";

export default function VoteOptions({
  alternative,
}: {
  alternative: ElectionAlternatives;
}) {
  return (
    <div className="flex flex-row mt-2 justify-between">
      <h3 className="p-1 mr-2">{alternative.choice}</h3>
      <button className="btn btn-sm rounded-md">Vote</button>
    </div>
  );
}
