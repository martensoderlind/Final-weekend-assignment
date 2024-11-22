type Props = {
  children: React.ReactNode;
};

export default function ConcludedElectionBoard({ children }: Props) {
  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4">
      <header className="grid grid-cols-4 gap-4">
        <p>Topic</p>
        <p className="text-center">Conclude Vote</p>
      </header>
      <div className="join join-vertical w-full">{children}</div>
    </section>
  );
}
