import { createElection } from "../actions";

export function ElectionForm() {
  return (
    <div className="container mx-auto w-10/12 bg-slate-100 rounded-md my-4 flex flex-col justify-center shadow-md">
      <h1 className="text-3xl font-bold text-center text-black">
        Add new Election
      </h1>
      <form action={createElection} className="flex flex-row justify-center">
        <label className="input input-bordered flex items-center gap-2 m-2">
          <input
            type="text"
            className="grow"
            id="election"
            name="election"
            placeholder="New Election"
            required
          />
        </label>
        <button className="btn m-2">Add</button>
      </form>
    </div>
  );
}
