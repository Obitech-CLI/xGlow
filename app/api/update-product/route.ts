import { Admin } from "@/lib/admin/admin";
import { createProductsService } from "@/lib/products/create.service";

export async function PATCH(req: Request) {
  const formData = await req.formData();

  const id = formData.get("id") as string;
  const category = (formData.get("category") as string).trim().toLowerCase();
  const title = (formData.get("title") as string).trim().toLowerCase();
  const price = (formData.get("price") as string).trim().toLowerCase();
  const discount = (formData.get("discount") as string).trim().toLowerCase();
  const description = (formData.get("description") as string)
    .trim()
    .toLowerCase();
  const ppackage = (formData.get("package") as string).trim().toLowerCase();
  const image = formData.get("image") as File;
  try {
    await Admin();
    const res = await createProductsService(
      category,
      title,
      price,
      discount,
      description,
      ppackage,
      image,
    );
    if (!res.success) {
      return Response.json(
        {
          success: res.success,
          error: res.error,
        },
        { status: res.status },
      );
    }

    return Response.json(
      {
        success: res.success,
        message: res.message,
      },
      { status: res.status },
    );
  } catch (err) {
    console.error(err);
    return Response.json(
      {
        success: false,
        error: "server error",
      },
      { status: 500 },
    );
  }
}
