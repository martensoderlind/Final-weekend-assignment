"use server";

import { revalidatePath } from "next/cache";
import { chatService } from "./instance";
import { ElectionAlternatives } from "./fixtures/mockdb";

export async function createRepresentative(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const uniqueEmail = await chatService.emailIsUnique(email);
  if (uniqueEmail) {
    await chatService.createNewRepresentative(name, email);
    revalidatePath("/representatives");
  }
}

export async function castVote(alternative: ElectionAlternatives) {
  const voter = await chatService.getVoter(
    "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9"
  );
  const vote = {
    electionId: alternative.electionId,
    voterId: voter!.id,
    choice: alternative.choice,
  };
  await chatService.addVote(vote);
  revalidatePath("/elctions");
}
