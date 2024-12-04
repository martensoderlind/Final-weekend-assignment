import { voteService } from "../instance";
import { Vote } from "../types";

type Props = {
  vote: Vote;
  electionId: string;
};

export default async function RepresentativeElectionResult({
  vote,
  electionId,
}: Props) {
  const representatives = await voteService.getRepresentative(vote.voterId!);
  const voters = await voteService.representativeVotes(vote.voterId!);
  const voterAgreement = await voteService.getRatioOfVotersThatAgree(
    vote.representativeId!,
    electionId,
    vote.choice!
  );
  console.log("choice", vote.choice);
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <p className="text-gray-950">{representatives[0].name}</p>
      <p className="text-center">{voters[0].count}</p>
      <p className="text-center">{voterAgreement.toFixed(0)}%</p>
    </div>
  );
}
