"use client";

import { useConfirmModal } from "@/contexts/modalContext";
import { UseDelete } from "@/hooks/useDelete";
import { UsePatch } from "@/hooks/usePatch";
import { ProductType } from "@/types/type";
import { DeleteIcon, Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  product: ProductType;
};

export default function Product({ product }: Props) {
  const [edit, setEdit] = useState({
    title: false,
    image: false,
    discount: false,
    price: false,
    description: false,
    package: false,
  });

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discount: "",
    description: "",
    package: "",
  });

  const UpdateProduct = UsePatch();
  const DeleteProduct = UseDelete();

  const [deleteId, setDeleteId] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");

  const { setConfirm, setConfirmMsg, confirm } = useConfirmModal();

  const [image, setImage] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form_data = new FormData();

    form_data.append("id", String(product.id));
    form_data.append("category", product.category);
    form_data.append("title", edit.title ? formData.title : "");
    form_data.append("price", edit.price ? formData.price : "");
    form_data.append("discount", edit.discount ? formData.discount : "");
    form_data.append(
      "description",
      edit.description ? formData.description : "",
    );
    form_data.append("package", edit.package ? formData.package : "");

    if (image) {
      form_data.append("image", image);
    }

    const res = await UpdateProduct.Patch("/update-product", form_data);

    if (res.success) {
      setFormData({
        title: "",
        price: "",
        discount: "",
        description: "",
        package: "",
      });

      setEdit({
        title: false,
        image: false,
        discount: false,
        price: false,
        description: false,
        package: false,
      });

      setImage(null);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  const deleting = () => {
    setConfirmMsg("are you sure you want to delete this product?");
  };

  const handleDelete = async () => {
    if (!deleteId && !deleteCategory) return;
    await DeleteProduct.Delete(`/delete-product/${deleteId}/${deleteCategory}`);
  };

  useEffect(() => {
    handleDelete();
  }, [confirm]);

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        <input
          type="text"
          name="title"
          defaultValue={product.title}
          disabled={!edit.title}
          onChange={handleFormChange}
        />
        <span
          onClick={() => setEdit((prev) => ({ ...prev, title: !edit.title }))}
        >
          {edit.title ? "cancel" : <Edit />}
        </span>
      </label>
      <label>
        <Image alt="" src={product.image} width={100} height={100} />
        <span
          onClick={() => setEdit((prev) => ({ ...prev, image: !edit.image }))}
        >
          {edit.image ? "cancel" : <Edit />}
        </span>
        {edit.image && (
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0] ?? null);
              }
            }}
          />
        )}
      </label>
      <label>
        <input
          type="number"
          name="price"
          defaultValue={product.price}
          onChange={handleFormChange}
          disabled={!edit.price}
        />
        <span
          onClick={() => setEdit((prev) => ({ ...prev, price: !edit.price }))}
        >
          {edit.price ? "cancel" : <Edit />}
        </span>
      </label>
      <label>
        <input
          type="number"
          name="discount"
          defaultValue={product.discount}
          onChange={handleFormChange}
          disabled={!edit.discount}
        />
        <span
          onClick={() =>
            setEdit((prev) => ({ ...prev, discount: !edit.discount }))
          }
        >
          {edit.discount ? "cancel" : <Edit />}
        </span>
      </label>
      <label>
        <textarea
          name="description"
          defaultValue={product.description}
          onChange={handleFormChange}
          disabled={!edit.description}
        />
        <span
          onClick={() =>
            setEdit((prev) => ({ ...prev, description: !edit.description }))
          }
        >
          {edit.description ? "cancel" : <Edit />}
        </span>
      </label>
      <label>
        <textarea
          name="package"
          defaultValue={product.package}
          onChange={handleFormChange}
          disabled={!edit.package}
        />
        <span
          onClick={() =>
            setEdit((prev) => ({ ...prev, package: !edit.package }))
          }
        >
          {edit.package ? "cancel" : <Edit />}
        </span>
      </label>
      <button
        type="button"
        onClick={() => {
          setDeleteId(String(product.id));
          setDeleteCategory(product.category);
          deleting();
        }}
      >
        <DeleteIcon color="red" />
        delete product
      </button>
      {edit.title ||
      edit.price ||
      edit.discount ||
      edit.description ||
      edit.package ||
      edit.image ? (
        <button type="submit" disabled={UpdateProduct.loading}>
          {UpdateProduct.loading ? "updating..." : "update"}
          {UpdateProduct.loading && <ClipLoader size={25} />}
        </button>
      ) : null}
    </form>
  );
}
