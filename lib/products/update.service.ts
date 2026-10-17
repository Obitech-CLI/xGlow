"use server";

import { Admin } from "../admin/admin";
import { supabase } from "../supabase";

export const createProductsService = async (
  id: string,
  category: string,
  title: string,
  price: string,
  discount: string,
  description: string,
  ppackage: string,
  image: File,
) => {
  await Admin();
  if (!id || !category) {
    return { success: false, error: "invalid request", status: 400 };
  }
  if (!title || !discount || !price || !description || !ppackage) {
    return { success: false, error: "all inputs are required", status: 400 };
  }

  const updates: Record<string, any> = {};
  if (title) updates.title = title;
  if (discount) updates.discount = discount;
  if (price) updates.price = price;
  if (description) updates.description = description;
  if (ppackage) updates.package = ppackage;

  if (image.size) {
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

    const path = decodeURIComponent(imgUrl.image.split("/product_images"))[1];

    const { error: deleteError } = await supabase.storage
      .from("products_images")
      .remove([path]);

    if (deleteError) {
      return {
        success: false,
        error: "something went wrong. try again",
        status: 500,
      };
    }

    const imageName = `${Date.now()}-${image.name}`;

    const { error: storageError } = await supabase.storage
      .from("products_images")
      .upload(`Products/${category}/${imageName}`, image, {
        contentType: image.type,
      });

    if (storageError) {
      return {
        success: true,
        message: "failed to save new content file to storage, try again",
        status: 500,
      };
    }

    const { data: newUrl } = supabase.storage
      .from("products_images")
      .getPublicUrl(`Products/${category}/${imageName}`);

    updates.image = newUrl.publicUrl;
  }

  if (Object.keys(updates).length === 0) {
    return { success: false, error: "no fields to update", status: 400 };
  }

  const { error: updateError } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .eq("category", category);

  if (updateError) {
    return {
      success: false,
      error: "failed to update product. try again",
      status: 500,
    };
  }

  return {
    success: true,
    message: "product updated successfully",
    status: 200,
  };
};
