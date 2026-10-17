"use server";

import bcrypt from "bcryptjs";
import { supabase } from "../supabase";
import jwt from "jsonwebtoken";

export const loginAdminService = async (username: string, password: string) => {
  const SECRET = process.env.JWT_SECRET as string;

  if (!username || !password) {
    return {
      success: false,
      error: "username and password are required",
      status: 400,
    };
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin")
    .select("*")
    .eq("username", username)
    .single();

  if (!admin || adminError) {
    return { success: false, error: "invalid credentials", status: 403 };
  }

  const matchPassword = await bcrypt.compare(password, admin.password);

  if (!matchPassword) {
    return { success: false, error: "invalid credentials", status: 403 };
  }

  const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: "1h" });

  return { success: true, message: "login success", status: 200, token };
};
