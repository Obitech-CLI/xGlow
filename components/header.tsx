"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMenu } from "../contexts/menuContext";
import "./components.css";

export function Header() {
  const pathname = usePathname();
  const { setShowMenu, showMenu } = useMenu();
  return (
    <header>
      <span>xGlow</span>
      {!pathname.startsWith("/admin") && (
        <>
          {!pathname.startsWith("/products") && (
            <button type="button" onClick={() => setShowMenu(!showMenu)}>
              {showMenu ? <X size={30} /> : <Menu size={30} />}
            </button>
          )}
        </>
      )}
    </header>
  );
}
