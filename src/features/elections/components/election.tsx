import { concludeVote, controllVote } from "../actions";
import { Election } from "../fixtures/mockdb";
import { chatService } from "../instance";
import NewVoteOption from "./new-vote-option";
import VoteOptions from "./vote-options";

type Props = {
  election: Election;
};

export default async function ActiveElection({ election }: Props) {
  const voteAlternatives = await chatService.getVoteAlternatives(election.id);
  const haveVoted = await controllVote(voteAlternatives[0].electionId);

  async function onclick() {
    "use server";
    await concludeVote(election.id);
  }
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3 className="p-1">{election.subject}</h3>
      </div>
      <div className="collapse-content flex flex-row justify-between">
        <article>
          {voteAlternatives.map((alternative, index) => (
            <VoteOptions
              key={index}
              alternative={alternative}
              haveVoted={haveVoted}
            />
          ))}
          {haveVoted ? undefined : <NewVoteOption electionId={election.id} />}
        </article>
        <button className="btn aling self-end rounded-md" onClick={onclick}>
          Conclude Vote
        </button>
      </div>
    </div>
  );
}
