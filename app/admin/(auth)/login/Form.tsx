"use client";

import { UsePost } from "@/hooks/usePost";
import { Lock, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function LoginAdminForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const LoginAdmin = UsePost();

  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await LoginAdmin.Post("/login-admin", formData);
    if (!res) return;
    if (res.success) {
      setFormData({
        username: "",
        password: "",
      });
      router.replace("/admin/dashboard");
    }
  };

  return (
    <form className="auth" onSubmit={handleFormSubmit}>
      <h3>welcome back</h3>
      <label>
        <User2 />
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="enter username..."
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
      <button type="submit" disabled={LoginAdmin.loading}>
        {LoginAdmin.loading ? "logging..." : "login"}
        {LoginAdmin.loading && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
