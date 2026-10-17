"use client";

import { useParams } from "@/contexts/paramsContext";
import { UseFetch } from "@/hooks/useFetch";
import { ProductType } from "@/types/type";
import { RotateCcw, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import "./products.css";

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
    <div className="my-products">
      {Products.loading ? (
        <div className="loading">
          <p>loading products...</p>
          <ClipLoader size={50} />
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <>
              <h2>{category ? category : "all products"}</h2>
              <div className="products">
                {products.map((product) => (
                  <div key={product.id}>
                    <Image
                      alt=""
                      src={product.image}
                      width={300}
                      height={200}
                      loading="eager"
                    />
                    <h3>{product.title}</h3>
                    <div>
                      <div>
                        <span className="discount">${product.discount}.00</span>
                        <span className="price">${product.price}.00</span>
                      </div>
                      <button type="button">
                        <Tag />
                        view product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
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
