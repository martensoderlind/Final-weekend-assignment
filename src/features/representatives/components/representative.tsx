import { voteService } from "@/features/elections/instance";
import { updateVoterRepresentative } from "../actions";
import { user } from "../db/mockUser";
import { representativeService } from "../instance";
import { RepresentativeInformation } from "../types";

type Props = {
  representative: RepresentativeInformation;
};

export default async function Representative({ representative }: Props) {
  const voter = await representativeService.getVoter(user.id);

  representativeService.setVoteRatioMethod(
    voteService.getTotalRatioOfVotersThatAgree
  );

  async function handleClick() {
    "use server";
    await updateVoterRepresentative(representative.id);
  }

  // const votes = await representativeService.getAllVotesfromRepresentativ();

  const agreement = await representativeService.representativeAgreementRatio(
    representative.id
  );

  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="pt-3 text-gray-900">{representative.name}</p>
      <p className="text-center pt-3">{agreement}%</p>
      <p className="text-center pt-3">{representative.votes}</p>
      <button
        className="btn btn-accent rounded-md"
        disabled={
          voter[0].representativeId === representative.id ? true : false
        }
        onClick={
          voter[0].representativeId === representative.id
            ? undefined
            : handleClick
        }
      >
        Vote
      </button>
    </article>
  );
}
