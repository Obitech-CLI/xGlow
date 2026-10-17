import { getProductsService } from "@/lib/products/get.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const category = searchParams.get("category") as string;
  const search = searchParams.get("search") as string;

  try {
    console.log("here");
    const res = await getProductsService(category, search);
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
        products: res.products,
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
