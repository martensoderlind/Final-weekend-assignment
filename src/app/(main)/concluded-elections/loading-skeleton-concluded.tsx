import React from "react";

export function LoadingSkeleton() {
  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4 shadow-md">
      <header className="">
        <h1 className="text-3xl font-bold text-center w-full text-black pb-2">
          Concluded Elections
        </h1>
      </header>
      <span className="loading loading-dots loading-lg self-center"></span>{" "}
    </section>
  );
}
