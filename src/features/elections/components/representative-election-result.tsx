import { voteService } from "../instance";
import { RepresentativeVote } from "../types";

type Props = {
  representative: RepresentativeVote;
  electionId: string;
};

export default async function RepresentativeElectionResult({
  representative,
  electionId,
}: Props) {
  const voterAgreement = await voteService.voterAgreement(
    representative,
    electionId
  );
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <p className="text-gray-500">{representative.name}</p>
      <p className="text-center">{representative.voters}</p>
      <p className="text-center">{voterAgreement}%</p>
    </div>
  );
}
