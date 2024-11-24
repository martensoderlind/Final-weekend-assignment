import { voteService } from "../instance";
import { VotingRepresentative } from "../types";

type Props = {
  representative: VotingRepresentative;
  electionId: string;
};

export default async function RepresentativeElectionResult({
  representative,
  electionId,
}: Props) {
  const voters = await voteService.representativeVotes(representative.voterId!);
  const voterAgreement = await voteService.voterAgreement(
    representative.voterId!,
    electionId
  );

  console.log("representative", representative);
  console.log("votes", voters.length);
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <p className="text-gray-500">{representative.name}</p>
      <p className="text-center">{voters.length}</p>
      <p className="text-center">{voterAgreement}%</p>
    </div>
  );
}
