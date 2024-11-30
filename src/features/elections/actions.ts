"use server";

import { revalidatePath } from "next/cache";
import { voteService } from "./instance";
import { Alternative } from "./types";
import { user } from "./fixtures/mockdb";

// export async function createRepresentative(formData: FormData) {
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   await voteService.createNewRepresentative(name, email);
//   revalidatePath("/representatives");
// }
export async function createElection(formData: FormData) {
  const election = formData.get("election") as string;
  await voteService.createElection(election);
  revalidatePath("/elections");
}

export async function castVote(alternative: Alternative) {
  await voteService.addVote(alternative.electionId, alternative.choice);
  revalidatePath("/elections");
}

export async function controllVote(electionId: string) {
  return await voteService.controllVote(electionId);
}

export async function concludeVote(electionId: string) {
  await voteService.concludeVote(electionId);
  revalidatePath("/elections");
}
export async function addElectionOption(electionId: string, newOption: string) {
  await voteService.addElectionOption(electionId, newOption);
  revalidatePath("/elections");
}

export async function updateVoterRepresentative(representativeId: string) {
  await voteService.updateVoterRepresentative(user.id, representativeId);
  revalidatePath("/representatives");
}
