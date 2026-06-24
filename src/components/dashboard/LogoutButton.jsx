"use client";

import { authClient } from "@/lib/auth-client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await authClient.signOut();

    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      className="
        w-full
        bg-red-600
        hover:bg-red-700
        text-white
        py-3
        rounded-xl
        font-semibold
        transition
      "
    >
      Logout
    </button>
  );
}