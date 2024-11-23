import React from "react";
import { addElectionOption } from "../actions";

type Props = {
  electionId: string;
};

export default async function NewVoteOption({ electionId }: Props) {
  async function handleForm(formdata: FormData) {
    "use server";
    const newOption = formdata.get("newOption") as string;
    await addElectionOption(electionId, newOption);
  }
  return (
    <form action={handleForm}>
      <input
        type="text"
        name="newOption"
        id="newOption"
        className="input mr-2 rounded-md"
        placeholder="Add new vote alternative..."
      />
      <button className="btn rounded-md mt-2">Add</button>
    </form>
  );
}
