export default function Representative({ name }: { name: string }) {
  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="">{name}</p>
      <p className="text-center">90%</p>
      <p className="text-center">50</p>
      <button className="btn btn-accent rounded-md">Vote</button>
    </article>
  );
}
