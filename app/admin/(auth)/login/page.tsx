import LoginAdminForm from "./Form";
import "../auth.css";

export default async function Page() {
  return (
    <main>
      <h2>login admin</h2>
      <LoginAdminForm />
    </main>
  );
}
