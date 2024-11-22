import { Election } from "../fixtures/mockdb";
import { chatService } from "../instance";
import ActiveElection from "./election";

export default async function ElectionBoard() {
  const elections: Election[] = await chatService.getAllActiveElections();
  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4">
      <header className="grid grid-cols-4 gap-4">
        <h2 className="text-3xl pl-4 text-slate-900 font-bold">
          Election Topics
        </h2>
        <p className="text-center">Conclude Vote</p>
      </header>
      <div className="join join-vertical w-full">
        {elections.map((election, index) => (
          <ActiveElection key={index} election={election} />
        ))}
      </div>
    </section>
  );
}
