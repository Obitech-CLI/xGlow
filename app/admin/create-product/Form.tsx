"use client";

import { UsePost } from "@/hooks/usePost";
import { Categories } from "@/ui/categories";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function CreateProductForm() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    price: "",
    discount: "",
    description: "",
    package: "",
  });
  const CreateProduct = UsePost();
  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [showCategories, setShowCategories] = useState(false);
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("category", formData.category);
    form_data.append("title", formData.title);
    form_data.append("price", formData.price);
    form_data.append("discount", formData.discount);
    form_data.append("description", formData.description);
    form_data.append("package", formData.package);

    if (image) {
      form_data.append("image", image);
    }

    const res = await CreateProduct.Post("/create-product", form_data);

    if (!res) return;

    if (res.success) {
      setFormData({
        category: "",
        title: "",
        price: "",
        discount: "",
        description: "",
        package: "",
      });

      setImage(null);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label className="select">
        <button
          type="button"
          onClick={() => setShowCategories(!showCategories)}
        >
          {formData.category ? formData.category : "select category"}
          <ChevronDown />
        </button>
        {showCategories && (
          <ul>
            {Categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    category: category.category,
                  }));
                }}
              >
                {category.category}
              </li>
            ))}
          </ul>
        )}
      </label>
      <label>
        title
        <input
          type="text"
          name="title"
          value={formData.title}
          placeholder="enter product title..."
          onChange={handleFormChange}
        />
      </label>
      <label>
        image
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => {
            if (e.target.files) {
              setImage(e.target.files[0] ?? null);
            }
          }}
        />
      </label>
      <label>
        main price
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="enter product price..."
          onChange={handleFormChange}
        />
      </label>
      <label>
        discount price
        <input
          type="number"
          name="discount"
          value={formData.discount}
          placeholder="enter product discount..."
          onChange={handleFormChange}
        />
      </label>
      <label>
        description
        <textarea
          name="description"
          value={formData.description}
          placeholder="enter product description..."
          onChange={handleFormChange}
        />
      </label>
      <label>
        package
        <textarea
          name="package"
          value={formData.package}
          placeholder="enter product package..."
          onChange={handleFormChange}
        />
      </label>
      <button type="submit" disabled={CreateProduct.loading}>
        {CreateProduct.loading ? "creating..." : "create"}
        {CreateProduct.loading && <ClipLoader size={25} />}
      </button>
    </form>
  );
}
