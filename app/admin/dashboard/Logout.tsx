"use client";

import { LogoutAdmin } from "./action";

export function LogoutAdminButton() {
  return (
    <button type="button" onClick={LogoutAdmin}>
      logout
    </button>
  );
}
