import { voteService } from "../instance";
import { Election } from "../types";
import ElectionOptions from "./concluded-election-options";

type Props = {
  election: Election;
};

export default async function ConcludedElection({ election }: Props) {
  const voteAlternatives = await voteService.getVoteAlternatives(election.id);
  const electionWinner = await voteService.electionWinner(voteAlternatives);

  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3 className="p-1 text-black font-bold">{election.subject}</h3>
      </div>
      <div className="collapse-content flex flex-row justify-between">
        <article>
          {voteAlternatives.map((alternative, index) => (
            <ElectionOptions
              key={index}
              alternative={alternative}
              electionWinner={electionWinner}
            />
          ))}
        </article>
      </div>
    </div>
  );
}
