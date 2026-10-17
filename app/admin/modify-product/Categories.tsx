"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "@/contexts/paramsContext";
import { Categories } from "@/ui/categories";
import "../admin.css";

export default function SearchCategories() {
  const { setCategory, setSearch } = useParams();

  return (
    <div className="admin-categories">
      <button
        type="button"
        className="All"
        onClick={() => {
          setCategory("");
          setSearch("");
        }}
      >
        all
      </button>
      {Categories.map((c) => (
        <button
          type="button"
          key={c.id}
          className={c.selector}
          onClick={() => {
            setCategory(c.category);
            setSearch("");
          }}
        >
          {c.category}
        </button>
      ))}
    </div>
  );
}
