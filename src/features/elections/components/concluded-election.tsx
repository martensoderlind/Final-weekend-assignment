import { Election } from "../fixtures/mockdb";
import { voteService } from "../instance";
import ElectionOptions from "./election-options";

type Props = {
  election: Election;
};

export default async function ConcludedElection({ election }: Props) {
  const voteAlternatives = await voteService.getVoteAlternatives(election.id);
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border ">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3 className="p-1 text-black font-bold">{election.subject}</h3>
      </div>
      <div className="collapse-content flex flex-row justify-between">
        <article>
          {voteAlternatives.map((alternative, index) => (
            <ElectionOptions key={index} alternative={alternative} />
          ))}
        </article>
      </div>
    </div>
  );
}
