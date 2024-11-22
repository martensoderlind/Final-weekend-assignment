type Props = {
  children: React.ReactNode;
};

export default function ElectionBoard({ children }: Props) {
  return (
    <section className="container mx-auto w-10/12 bg-slate-100 flex flex-col my-4 rounded-md p-4">
      <header className="grid grid-cols-4 gap-4 border-b-2">
        <p>Topic</p>
        <p className="text-center">Conclude Vote</p>
      </header>
      {children}
    </section>
  );
}
