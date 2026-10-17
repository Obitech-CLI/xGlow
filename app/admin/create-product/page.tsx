import { Admin } from "@/lib/admin/admin";
import CreateProductForm from "./Form";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>create products</h2>
      <CreateProductForm />
    </main>
  );
}
