"use server";

import { revalidatePath } from "next/cache";
import { voteService } from "./instance";
import { Alternative } from "./types";

const user = {
  id: "57977e27-f576-4d2e-89ab-90414b42649c",
};

export async function createRepresentative(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const uniqueEmail = await voteService.emailIsUnique(email);
  if (uniqueEmail) {
    await voteService.createNewRepresentative(name, email);
    revalidatePath("/representatives");
  }
}
export async function createElection(formData: FormData) {
  const election = formData.get("election") as string;
  await voteService.createElection(election);

  revalidatePath("/elections");
}

export async function castVote(alternative: Alternative) {
  const voter = await voteService.getVoter(user.id);
  const vote = {
    electionId: alternative.electionId,
    voterId: voter[0]!.id,
    choice: alternative.id,
  };
  await voteService.addVote(vote, voter[0]!.representativeId);
  revalidatePath("/elections");
}

export async function controllVote(electionId: string) {
  const voter = await voteService.getVoter(user.id);
  return await voteService.controllVote(electionId, voter[0]!.id);
}

export async function concludeVote(electionId: string) {
  await voteService.concludeVote(electionId);
  revalidatePath("/elections");
}
export async function addElectionOption(electionId: string, newOption: string) {
  await voteService.addElectionOption(electionId, newOption);
  revalidatePath("/elections");
}

export async function getRepresentativeVotes(
  electionId: string,
  choice: string
) {
  const representativeInformation =
    await voteService.getRepresentativeInformation();
  const electionResult = await voteService.getElectionResult(
    representativeInformation,
    electionId,
    choice
  );
  return electionResult;
}
