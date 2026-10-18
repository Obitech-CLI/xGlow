import { getProduct } from "@/lib/product";
import Product from "./Product";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    id?: string;
    category?: string;
    title?: string;
  }>;
}) {
  const { id, category, title } = await searchParams;
  const res = await getProduct(id, category, title);
  return (
    <main>
      <Suspense fallback={<p>loading...</p>}>
        <Product product={res?.product} error={res.error} />
      </Suspense>
    </main>
  );
}
