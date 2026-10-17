import { Plus, Settings2 } from "lucide-react";
import Link from "next/link";
import { LogoutAdminButton } from "./Logout";
import "../admin.css";
import { Admin } from "@/lib/admin/admin";

export default async function Dashboard() {
  const admin = await Admin();
  return (
    <main className="admin-dashboard">
      <h2>admin dashboard</h2>
      <h3>{admin.username}</h3>
      <LogoutAdminButton />
      <nav>
        <Link href="/admin/create-product">
          <Plus />
          create product
        </Link>
        <Link href="/admin/modify-product">
          <Settings2 />
          modify product
        </Link>
      </nav>
    </main>
  );
}
