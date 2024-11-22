"use server";
export async function createRepresentativ(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  console.log(name, email);

  return;
}
