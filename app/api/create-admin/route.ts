import { createAdminService } from "@/lib/auth/create.service";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const username = body.username.trim().toLowerCase();
  const email = body.email.trim().toLowerCase();
  const password = body.password.trim().toLowerCase();

  const cookieStore = await cookies();
  try {
    const res = await createAdminService(username, email, password);
    if (!res.success) {
      return Response.json(
        {
          success: res.success,
          error: res.error,
        },
        { status: res.status },
      );
    }

    if (res.token) {
      cookieStore.set("token", res.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60,
        path: "/",
      });
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
