import CreateAdminForm from "./Form";
import "../auth.css";

export default async function Page() {
  return (
    <main>
      <h2>create admin</h2>
      <CreateAdminForm />
    </main>
  );
}
