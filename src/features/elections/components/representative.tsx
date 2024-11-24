import { revalidatePath } from "next/cache";
import { voteService } from "../instance";
import { RepresentativeInformation } from "../types";

type Props = {
  representative: RepresentativeInformation;
};

export default async function Representative({ representative }: Props) {
  const voter = await voteService.getVoter(
    "a1d31219-8527-420a-adc5-79939d05b419"
  );
  async function handleClick() {
    "use server";
    await voteService.updateVoterRepresentative(
      voter[0]!.id,
      representative.id
    );
    revalidatePath("/representatives");
  }
  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="pt-3 text-gray-900">{representative.name}</p>
      <p className="text-center pt-3">90%</p>
      <p className="text-center pt-3">{representative.voters}</p>
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
