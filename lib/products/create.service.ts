"use server";

import { Admin } from "../admin/admin";
import { supabase } from "../supabase";

export const createProductsService = async (
  category: string,
  title: string,
  price: string,
  discount: string,
  description: string,
  ppackage: string,
  image: File,
) => {
  await Admin();
  if (!category || !title || !discount || !price || !description || !ppackage) {
    return { success: false, error: "all inputs are required", status: 400 };
  }

  if (!image.size || !image) {
    return { success: false, error: "no image uploaded", status: 400 };
  }

  const imageName = `${Date.now()}-${image.name}`;

  const { error: storageError } = await supabase.storage
    .from("products_images")
    .upload(`Products/${category}/${imageName}`, image, {
      contentType: image.type,
    });

  if (storageError) {
    return {
      success: false,
      error: "failed to save image to storage. try again",
      status: 500,
    };
  }

  const { data: imageUrl } = supabase.storage
    .from("products_images")
    .getPublicUrl(`Products/${category}/${imageName}`);

  const { error: insertError } = await supabase.from("products").insert({
    category: category,
    title: title,
    image: imageUrl.publicUrl,
    price: price,
    discount: discount,
    description: description,
    package: ppackage,
  });

  if (insertError) {
    return {
      success: false,
      error: "failed to create product. try again",
      status: 500,
    };
  }

  return { success: true, message: "product created success", status: 201 };
};
