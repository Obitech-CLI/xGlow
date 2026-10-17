"use client";

import { UsePost } from "@/hooks/usePost";
import { Lock, Mail, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function CreateAdminForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const CreateAdmin = UsePost();
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await CreateAdmin.Post("/create-admin", formData);
    if (!res) return;
    if (res.success) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      router.replace("/admin/dashboard");
    }
  };
  return (
    <form className="auth" onSubmit={handleFormSubmit}>
      <h3>become an admin</h3>
      <label>
        <User2 />
        <input
          type="text"
          value={formData.username}
          name="username"
          placeholder="enter username..."
          onChange={handleFormChange}
        />
      </label>
      <label>
        <Mail />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="enter email address..."
          onChange={handleFormChange}
        />
      </label>
      <label>
        <Lock />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="enter password..."
          onChange={handleFormChange}
        />
      </label>
      <button type="submit" disabled={CreateAdmin.loading}>
        {CreateAdmin.loading ? "creating..." : "create"}
        {CreateAdmin.loading && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
