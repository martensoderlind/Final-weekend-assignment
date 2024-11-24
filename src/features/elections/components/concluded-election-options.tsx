import { voteService } from "../instance";
import { Alternative } from "../types";
import RepresentativeElectionResult from "./representative-election-result";

type Props = {
  alternative: Alternative;
};

export default async function ElectionOptions({ alternative }: Props) {
  const representatives = await voteService.getVotingRepresentatives(
    alternative.electionId,
    alternative.id
  );
  //val alternativ
  //hämtar representanter som röstat på förslaget
  return (
    <div className="mt-2">
      <h3 className="text-l text-gray-800 font-semibold">
        {alternative.choice}
      </h3>
      <header className="grid grid-cols-3 gap-4 border-b-2">
        <h3 className="text-gray-700">Representativs</h3>
        <h3 className="text-center text-gray-700">Votes</h3>
        <h3 className="text-center text-gray-700">Agreement</h3>
      </header>
      {representatives.map((representative, index) => (
        <RepresentativeElectionResult
          key={index}
          representative={representative}
          electionId={alternative.electionId}
        />
      ))}
    </div>
  );
}
