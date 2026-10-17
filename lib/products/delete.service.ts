"use server";

import { Admin } from "../admin/admin";
import { supabase } from "../supabase";

export const deleteProductService = async (id: string, category: string) => {
  await Admin();
  if (!id || !category) {
    return { success: false, error: "invalid request", status: 400 };
  }

  const { data: imgUrl, error: imgUrlError } = await supabase
    .from("products")
    .select("image")
    .eq("id", id)
    .eq("category", category)
    .single();

  if (!imgUrl || imgUrlError) {
    return {
      success: false,
      error: "something went wrong. try again",
      status: 500,
    };
  }

  const { error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .eq("category", category);

  if (deleteError) {
    return {
      success: false,
      error: "something went wrong. try again",
      status: 500,
    };
  }

  const path = decodeURIComponent(imgUrl.image.split("/products_images"))[1];

  const { error: storageError } = await supabase.storage
    .from("products_images")
    .remove([path]);

  if (storageError) {
    return {
      success: true,
      message: "product deleted successfully. clean up storage manually",
      status: 200,
    };
  }

  return {
    success: true,
    error: "product deleted successfully",
    status: 200,
  };
};
