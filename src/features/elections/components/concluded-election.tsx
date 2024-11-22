import ElectionOptions from "./election-options";

export default function ConcludedElection() {
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border ">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3 className="p-1 text-black font-bold">Election subject</h3>
      </div>
      <div className="collapse-content flex flex-row justify-between">
        <article>
          <ElectionOptions />
          <ElectionOptions />
        </article>
      </div>
    </div>
  );
}
