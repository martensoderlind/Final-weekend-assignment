export default function electionForm() {
  return (
    <div className="container mx-auto w-10/12 bg-slate-100 rounded-md my-4 flex flex-col justify-center">
      <h1 className="text-3xl text-bold text-center">Add new Election</h1>
      <form action="" className="flex flex-row justify-center">
        <label className="input input-bordered flex items-center gap-2 m-2">
          <input type="text" className="grow" placeholder="Name" />
        </label>
        <button className="btn m-2">Add</button>
      </form>
    </div>
  );
}
