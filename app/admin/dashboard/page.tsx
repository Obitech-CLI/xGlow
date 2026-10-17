import { Suspense } from "react";
import Dashboard from "./Dashboard";

export default function Page() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}
