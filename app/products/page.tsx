import { getProduct } from "@/lib/product";
import Product from "./Product";

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
      <Product product={res?.product} error={res.error} />
    </main>
  );
}
