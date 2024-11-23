import { ElectionAlternatives } from "../fixtures/mockdb";
import RepresentativeElectionResult from "./representative-election-result";

type Props = {
  alternative: ElectionAlternatives;
};

export default function ElectionOptions({ alternative }: Props) {
  return (
    <div className="mt-2">
      <h3 className="text-l text-gray-800 font-semibold">
        {alternative.choice}
      </h3>
      <header className="grid grid-cols-3 gap-4 border-b-2">
        <h3 className="text-gray-700">Representativ</h3>
        <h3 className="text-center text-gray-700">Votes</h3>
        <h3 className="text-center text-gray-700">Agreement</h3>
      </header>
      <RepresentativeElectionResult />
      <RepresentativeElectionResult />
    </div>
  );
}
