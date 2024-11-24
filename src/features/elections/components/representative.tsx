import { updateVoterRepresentative } from "../actions";
import { user } from "../fixtures/mockdb";
import { voteService } from "../instance";
import { RepresentativeInformation } from "../types";

type Props = {
  representative: RepresentativeInformation;
};

export default async function Representative({ representative }: Props) {
  const voter = await voteService.getVoter(user.id);
  async function handleClick() {
    "use server";
    await updateVoterRepresentative(representative.id);
  }
  const votes = await voteService.getAllVotesfromRepresentativ(
    representative.id
  );
  const agreement = await voteService.getVotesFromVoters(representative, votes);

  console.log("votes:", votes);
  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="pt-3 text-gray-900">{representative.name}</p>
      <p className="text-center pt-3">{agreement}%</p>
      <p className="text-center pt-3">{representative.votes}</p>
      <button
        className="btn btn-accent rounded-md"
        disabled={
          voter[0]!.representativeId === representative.id ? true : false
        }
        onClick={
          voter[0]!.representativeId === representative.id
            ? undefined
            : handleClick
        }
      >
        Vote
      </button>
    </article>
  );
}
