"use server";

import { supabase } from "../supabase";

export const getProductsService = async (category: string, search: string) => {
  console.log(category);
  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return {
      success: false,
      error: "failed to fetch products. try again",
      status: 500,
    };
  }

  if (data.length === 0) {
    return {
      success: false,
      error: `no ${category ? category : ""} product found`,
      status: 404,
    };
  }

  return { success: true, products: data, status: 200 };
};
