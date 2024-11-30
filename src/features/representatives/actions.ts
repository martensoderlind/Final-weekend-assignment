import { revalidatePath } from "next/cache";
import { representativeService } from "./instance";
import { user } from "./db/mockUser";

export async function createRepresentative(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  await representativeService.createNewRepresentative(name, email);
  revalidatePath("/representatives");
}
export async function updateVoterRepresentative(representativeId: string) {
  await representativeService.updateVoterRepresentative(
    user.id,
    representativeId
  );
  revalidatePath("/representatives");
}
