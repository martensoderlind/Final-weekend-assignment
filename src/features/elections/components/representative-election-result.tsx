import { representativeVote } from "../types";

type Props = {
  representative: representativeVote;
};

export default function RepresentativeElectionResult({
  representative,
}: Props) {
  return (
    <div className="grid grid-cols-3 gap-4 ">
      <p className="text-gray-500">{representative.name}</p>
      <p className="text-center">{representative.voters}</p>
      <p className="text-center">67%</p>
    </div>
  );
}
