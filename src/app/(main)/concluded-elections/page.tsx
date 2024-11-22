import ConcludedElection from "@/features/elections/components/concluded-election";
import ConcludedElectionBoard from "@/features/elections/components/concluded-election-board";

export default function page() {
  return (
    <>
      <ConcludedElectionBoard>
        <ConcludedElection />
        <ConcludedElection />
      </ConcludedElectionBoard>
    </>
  );
}
