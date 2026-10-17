"use client";

import { childrenNode } from "@/types/type";
import { createContext, SetStateAction, useContext, useState } from "react";

type ContextProps = {
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
};

const ParamsContext = createContext<ContextProps | null>(null);

function ParamsProvider({ children }: childrenNode) {
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <ParamsContext.Provider
      value={{
        category,
        setCategory,
        search,
        setSearch,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
}

export { ParamsProvider };

export const useParams = () => {
  const context = useContext(ParamsContext);
  if (!context) {
    throw new Error("no context available");
  }

  return context;
};
