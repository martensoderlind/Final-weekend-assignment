import React from "react";

type Props = {
  electionId: string;
};

export default function NewVoteOption({ electionId }: Props) {
  return (
    <form>
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
