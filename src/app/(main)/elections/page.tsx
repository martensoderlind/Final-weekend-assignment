import Election from "@/features/elections/components/election";
import ElectionBoard from "@/features/elections/components/election-board";
import ElectionForm from "@/features/elections/components/election-form";

export default function Page() {
  return (
    <>
      <ElectionForm />
      <ElectionBoard>
        <Election />
        <Election />
      </ElectionBoard>
    </>
  );
}
