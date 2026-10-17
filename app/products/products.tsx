"use client";

import { useParams } from "@/contexts/paramsContext";
import { UseFetch } from "@/hooks/useFetch";
import { ProductType } from "@/types/type";
import { RotateCcw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);

  const { category, search } = useParams();

  const Products = UseFetch();

  const fetchProducts = async () => {
    setProducts([]);
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
                <div key={product.id}>
                  <span>{product.category}</span>
                  <Image
                    alt=""
                    src={product.image}
                    width={300}
                    height={200}
                    loading="eager"
                  />
                  <h3>{product.title}</h3>
                </div>
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
