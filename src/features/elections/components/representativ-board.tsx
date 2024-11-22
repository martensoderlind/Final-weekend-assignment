import React from "react";
import { chatService } from "../instance";
import Representativ from "./representativ";
import { Representativs } from "../fixtures/mockdb";

export default async function RepresentativBoard() {
  const allRepresentativs: Representativs[] =
    await chatService.getAllRepresentativs();

  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4">
      <header className="grid grid-cols-4 gap-4 border-b-2">
        <p>Name</p>
        <p className="text-center">Agreement</p>
        <p className="text-center">Votes</p>
        <p className="text-center">Pick representativ</p>
      </header>
      {allRepresentativs.map((representativ) => (
        <Representativ key={representativ.id} name={representativ.name} />
      ))}
    </section>
  );
}
