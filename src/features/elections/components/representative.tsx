export default function Representative({ name }: { name: string }) {
  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="pt-3 text-gray-900">{name}</p>
      <p className="text-center pt-3">90%</p>
      <p className="text-center pt-3">50</p>
      <button className="btn btn-accent rounded-md">Vote</button>
    </article>
  );
}
