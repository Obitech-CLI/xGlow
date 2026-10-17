"use client";

import { useParams } from "@/contexts/paramsContext";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export default function Search() {
  const [input, setInput] = useState("");
  const { setSearch } = useParams();
  return (
    <fieldset>
      <label>
        <input
          type="search"
          value={input}
          placeholder="enter a keyword..."
          onChange={(e) => setInput(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={() => {
          setSearch(input);
        }}
      >
        <SearchIcon />
      </button>
    </fieldset>
  );
}
