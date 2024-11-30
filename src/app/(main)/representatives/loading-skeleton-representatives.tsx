import React from "react";

export default function LoadingSkeleton() {
  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4 shadow-md">
      <header className="grid grid-cols-4 gap-4 border-b-2">
        <p className="text-gray-600 font-semibold">Name</p>
        <p className="text-center text-gray-600 font-semibold">Agreement</p>
        <p className="text-center text-gray-600 font-semibold">Votes</p>
        <p className="text-center text-gray-600 font-semibold">
          Pick Representative
        </p>
      </header>
      <p className="text-center">Loading..,</p>
    </section>
  );
}
