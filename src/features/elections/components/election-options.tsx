import RepresentativeElectionResult from "./representative-election-result";

export default function ElectionOptions() {
  return (
    <div className="mt-2">
      <h3 className="text-l text-gray-800 font-semibold">Election option</h3>
      <header className="grid grid-cols-3 gap-4 border-b-2">
        <h3>Representativ</h3>
        <h3 className="text-center">Votes</h3>
        <h3 className="text-center">Agreement</h3>
      </header>
      <RepresentativeElectionResult />
      <RepresentativeElectionResult />
    </div>
  );
}
