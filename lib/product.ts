"use server";

import { supabase } from "./supabase";

export const getProduct = async (
  id?: string,
  category?: string,
  title?: string,
) => {
  let query = supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("category", category)
    .eq("title", title)
    .single();

  const { data, error } = await query;

  if (!data || error) {
    return {
      error: "something went wrong. try again",
    };
  }

  return { product: data };
};
