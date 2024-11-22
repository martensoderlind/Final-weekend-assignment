export default function Election() {
  return (
    <div className="collapse collapse-arrow join-item border-base-300 border">
      <input type="radio" name="my-accordion-4" defaultChecked />
      <div className="collapse-title text-xl font-medium flex justify-between">
        <h3>Election subject</h3>
        <button className="btn">Conclude Vote</button>
      </div>
      <div className="collapse-content">
        <p>hello</p>
      </div>
    </div>
  );
}
