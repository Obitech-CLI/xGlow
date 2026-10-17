import { Admin } from "@/lib/admin/admin";
import SearchCategories from "./Categories";
import Products from "./Products";
import Search from "./Search";

export default async function Page() {
  await Admin();
  return (
    <main>
      <h2>modify products</h2>
      <SearchCategories />
      <Search />
      <Products />
    </main>
  );
}
