import { concludeVote, controllVote } from "../actions";
import { voteService } from "../instance";
import { Election } from "../types";
import NewVoteOption from "./new-vote-option";
import VoteOptions from "./vote-options";

type Props = {
  election: Election;
};

export default async function ActiveElection({ election }: Props) {
  const voteAlternatives = await voteService.getElectionAlternatives(
    election.id
  );

  let haveVoted;

  if (voteAlternatives.length > 0) {
    haveVoted = await controllVote(election.id);
  } else {
    haveVoted = false;
  }

  async function onclick() {
    "use server";
    await concludeVote(election.id);
  }

  return (
    <section className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3 className="p-1">{election.subject}</h3>
      </div>
      <div className="collapse-content flex flex-col md:flex-row justify-between">
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
        <button
          className="btn btn-accent aling md:self-end rounded-md my-2 md:my-0"
          onClick={onclick}
        >
          Conclude Vote
        </button>
      </div>
    </section>
  );
}
