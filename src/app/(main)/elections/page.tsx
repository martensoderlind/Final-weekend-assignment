import { ElectionBoard } from "@/features";
import { ElectionForm } from "@/features";
import { Suspense } from "react";
import Loading from "./loading";

export default function Page() {
  return (
    <>
      <ElectionForm />
      <Suspense fallback={<Loading />}>
        <ElectionBoard />
      </Suspense>
    </>
  );
}
