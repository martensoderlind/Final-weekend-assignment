import { voteService } from "../instance";
import { Alternative, ElectionAlternative } from "../types";
import NoVotes from "./no-votes";
import RepresentativeElectionResult from "./representative-election-result";

type Props = {
  alternative: ElectionAlternative;
  electionWinner: Alternative;
};

export default async function ElectionOptions({
  alternative,
  electionWinner,
}: Props) {
  const votingRepresentatives = await voteService.votedForTheAlternative(
    alternative.electionId,
    alternative.id
  );
  if (votingRepresentatives.length === 0) {
    return <NoVotes alternative={alternative} />;
  }
  console.log("voting reps:", votingRepresentatives);
  const totalVotes = await voteService.getTotalVotes(votingRepresentatives);

  return (
    <section className="mt-4  bg-accent p-1 rounded-md">
      <h3 className="text-l text-gray-950 font-semibold">
        {alternative.id === electionWinner.id
          ? `${alternative.choice} - Winner`
          : alternative.choice}
      </h3>
      <h2 className="text-gray-800 text-sm">
        votes{" "}
        <span className="text-gray-950 text-md font-semibold">
          {totalVotes}
        </span>
      </h2>
      <header className="grid grid-cols-3 gap-4 border-b-2">
        <h3 className="text-gray-800 font-semibold">Representativs</h3>
        <h3 className="text-center text-gray-800 font-semibold">Votes</h3>
        <h3 className="text-center text-gray-800 font-semibold">Agreement</h3>
      </header>
      {votingRepresentatives.map((representativeVote, index) => (
        <RepresentativeElectionResult
          key={index}
          vote={representativeVote}
          electionId={alternative.electionId}
        />
      ))}
    </section>
  );
}
