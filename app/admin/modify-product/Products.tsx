"use client";

import { UseFetch } from "@/hooks/useFetch";
import { ProductType } from "@/types/type";
import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Product from "./Product";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const { category, search } = useParams();

  console.log(category);

  const Products = UseFetch();

  const fetchProducts = async () => {
    const res = await Products.Fetch(
      `/get-products?category=${category ? category : ""}&search=${search ? search : ""}`,
    );
    if (!res) return;
    if (res.success) {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, search]);
  return (
    <div>
      {Products.loading ? (
        <div>
          <p>loading products...</p>
          <ClipLoader size={50} />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div>
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <>
              {Products.error && products.length === 0 ? (
                <div className="retry">
                  <p>{Products.error}</p>
                  <button type="button" onClick={fetchProducts}>
                    <RotateCcw /> retry
                  </button>
                </div>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
}
