import React from "react";
import { createRepresentative } from "../actions";

export function RepresentativeForm() {
  return (
    <div className="container mx-auto w-10/12 bg-slate-100 rounded-md my-4 flex  flex-col justify-center shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-950 pt-2">
        Add Representative
      </h1>
      <form
        action={createRepresentative}
        className="flex flex-col md:flex-row justify-center"
      >
        <label className="input input-bordered flex items-center gap-2 m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            id="name"
            name="name"
            placeholder="Name"
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 m-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow"
            id="email"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <button className="btn btn-secondary m-2">Add</button>
      </form>
    </div>
  );
}
