import Representativ from "@/features/elections/components/representativ";
import RepresentativBoard from "@/features/elections/components/representativ-board";
import RepresentativForm from "@/features/elections/components/representativ-form";

export default function Page() {
  return (
    <>
      <RepresentativForm />
      <RepresentativBoard>
        <Representativ />
        <Representativ />
        <Representativ />
        <Representativ />
        <Representativ />
      </RepresentativBoard>
    </>
  );
}
