import { Election } from "../fixtures/mockdb";
import { chatService } from "../instance";
import VoteOptions from "./vote-options";

export default async function ActiveElection({
  election,
}: {
  election: Election;
}) {
  const voteAlternatives = await chatService.getVoteAlternatives(election.id);
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3 className="p-1">{election.subject}</h3>
      </div>
      <div className="collapse-content flex flex-row justify-between">
        <article>
          {voteAlternatives.map((alternative, index) => (
            <VoteOptions key={index} alternative={alternative} />
          ))}
        </article>
        <button className="btn aling self-end rounded-md">Conclude Vote</button>
      </div>
    </div>
  );
}
