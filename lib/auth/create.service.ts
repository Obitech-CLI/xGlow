"use server";

import bcrypt from "bcryptjs";
import { supabase } from "../supabase";
import jwt from "jsonwebtoken";

export const createAdminService = async (
  username: string,
  email: string,
  password: string,
) => {
  const SECRET = process.env.JWT_SECRET as string;

  if (!username || !email || !password) {
    return {
      success: false,
      error: "all fields are required",
      status: 400,
    };
  }

  const { data, error } = await supabase
    .from("admin")
    .select("username, email")
    .or(`username.eq.${username},email.eq.${email}`)
    .maybeSingle();

  if (error) {
    return {
      success: false,
      error: "something went wrong. try again",
      status: 500,
    };
  }

  if (data) {
    return { success: false, error: "invalid credentials", status: 409 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: admin, error: insertError } = await supabase
    .from("admin")
    .insert({
      username: username,
      email: email,
      password: hashedPassword,
    })
    .select("id")
    .single();

  if (insertError) {
    return {
      success: false,
      error: "failed to create account. try again",
      status: 500,
    };
  }

  const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: "1h" });

  return {
    success: true,
    message: "account created success",
    status: 200,
    token,
  };
};
