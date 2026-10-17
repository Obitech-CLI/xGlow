"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMenu } from "../contexts/menuContext";
import { Categories } from "./categories";
import { useParams } from "@/contexts/paramsContext";

export default function MenuModal() {
  const { showMenu, setShowMenu } = useMenu();

  const { setCategory, setSearch } = useParams();

  return (
    <>
      {showMenu && (
        <div className="menu">
          <button
            type="button"
            className="All"
            onClick={() => {
              setCategory("");
              setShowMenu(false);
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
                setShowMenu(false);
              }}
            >
              {c.category}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
