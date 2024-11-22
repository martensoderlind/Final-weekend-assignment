import { RepresentativeInformation } from "./representative-board";

const votersRepresentativ = "024bde8c-df3a-43ee-9fa8-2decd24c054f";

export default function Representative({
  representativeInformation,
}: {
  representativeInformation: RepresentativeInformation;
}) {
  return (
    <article className="grid grid-cols-4 gap-4 my-2">
      <p className="pt-3 text-gray-900">{representativeInformation.name}</p>
      <p className="text-center pt-3">90%</p>
      <p className="text-center pt-3">{representativeInformation.voters}</p>
      <button
        className="btn btn-accent rounded-md"
        disabled={
          votersRepresentativ === representativeInformation.id ? true : false
        }
      >
        Vote
      </button>
    </article>
  );
}
