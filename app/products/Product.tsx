"use client";

import { ProductType } from "@/types/type";
import { RotateCcw, ShoppingCart, TagIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./products.css";

type Props = {
  product?: ProductType;
  error?: string;
};

export default function Product({ product, error }: Props) {
  const router = useRouter();
  return (
    <div>
      {error && (
        <div className="retry">
          <p>{error}</p>
          <button type="button" onClick={() => router.refresh()}>
            <RotateCcw /> retry
          </button>
        </div>
      )}
      {product && (
        <div className="product">
          <h2>{product.title}</h2>
          <Image src={product.image} alt="" height={200} width={200} />
          <p>
            <span>description</span>
            {product.description}
          </p>
          <div>
            <div>
              <span className="discount">
                <TagIcon />${product.discount}.00
              </span>
              <span className="price">${product.price}.00</span>
            </div>
            <button type="button" onClick={() => window.Tawk_API?.maximize()}>
              <ShoppingCart />
              buy product
            </button>
          </div>
          <h3>purchase package</h3>
          <ul>
            <span>what you will get</span>
            {product.package.split(".").map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
