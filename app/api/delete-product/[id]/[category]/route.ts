import { Admin } from "@/lib/admin/admin";
import { deleteProductService } from "@/lib/products/delete.service";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; category: string }> },
) {
  const { id, category } = await params;
  try {
    await Admin();
    const res = await deleteProductService(id, category);

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
