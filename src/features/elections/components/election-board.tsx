import { voteService } from "../instance";
import { Election } from "../types";
import ActiveElection from "./active-election";

export async function ElectionBoard() {
  const elections: Election[] = await voteService.getAllActiveElections();

  if (elections.length === 0) {
    return (
      <div>
        <h2 className="text-2xl pl-4 text-slate-900 font-bold text-center">
          No Active elections
        </h2>
      </div>
    );
  }
  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4 shadow-md">
      <header className="grid grid-cols-4 gap-4">
        <h2 className="text-3xl pl-4 text-slate-900 font-bold">
          Election Topics
        </h2>
      </header>
      <div className="join join-vertical w-full">
        {elections.map((election, index) => (
          <ActiveElection key={index} election={election} />
        ))}
      </div>
    </section>
  );
}
