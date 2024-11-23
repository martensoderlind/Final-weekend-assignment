import { revalidatePath } from "next/cache";
import { chatService } from "../instance";
import { RepresentativeInformation } from "./representative-board";

type Props = {
  representativeInformation: RepresentativeInformation;
};

export default async function Representative({
  representativeInformation,
}: Props) {
  const voter = await chatService.getVoter(
    "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9"
  );
  async function handleClick() {
    "use server";
    await chatService.updateVoterRepresentative(
      voter!.id,
      representativeInformation.id
    );
    revalidatePath("/representatives");
  }
  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="pt-3 text-gray-900">{representativeInformation.name}</p>
      <p className="text-center pt-3">90%</p>
      <p className="text-center pt-3">{representativeInformation.voters}</p>
      <button
        className="btn btn-accent rounded-md"
        disabled={
          voter!.representativeId === representativeInformation.id
            ? true
            : false
        }
        onClick={
          voter!.representativeId === representativeInformation.id
            ? undefined
            : handleClick
        }
      >
        Vote
      </button>
    </article>
  );
}
