"use server";

import { revalidatePath } from "next/cache";
import { voteService } from "./instance";
import { ElectionAlternatives } from "./fixtures/mockdb";

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

export async function castVote(alternative: ElectionAlternatives) {
  const voter = await voteService.getVoter(
    "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9"
  );
  const vote = {
    electionId: alternative.electionId,
    voterId: voter!.id,
    choice: alternative.choice,
  };
  await voteService.addVote(vote);
  revalidatePath("/elections");
}

export async function controllVote(electionId: string) {
  const voter = await voteService.getVoter(
    "c4409dc1-ad5b-4e2a-a8e5-de2051e7a6c9"
  );
  return await voteService.controllVote(electionId, voter!.id);
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
