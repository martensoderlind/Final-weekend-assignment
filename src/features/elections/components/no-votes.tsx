import React from "react";
import { Alternative } from "../types";
type Props = {
  alternative: Alternative;
};

export default function NoVotes({ alternative }: Props) {
  return (
    <section className="mt-4 bg-secondary p-1 rounded-md">
      <h3 className="text-l text-gray-800 font-semibold">
        {alternative.choice}
      </h3>
    </section>
  );
}
