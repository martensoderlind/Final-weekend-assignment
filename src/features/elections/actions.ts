"use server";

import { revalidatePath } from "next/cache";
import { chatService } from "./instance";

export async function createRepresentative(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const uniqueEmail = await chatService.emailIsUnique(email);
  if (uniqueEmail) {
    await chatService.createNewRepresentative(name, email);
    revalidatePath("/representatives");
  }
}
