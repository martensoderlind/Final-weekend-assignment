import React from "react";

export default function RepresentativForm() {
  return (
    <div className="container mx-auto w-10/12 bg-slate-100 rounded-md my-4 flex flex-col justify-center">
      <h1 className="text-3xl text-bold text-center">Add Representativ</h1>
      <form action="" className="flex flex-row justify-center">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs m-2"
        />
        <input
          type="text"
          className="input input-bordered w-full max-w-xs m-2"
        />
        <button className="btn m-2">Add</button>
      </form>
    </div>
  );
}
