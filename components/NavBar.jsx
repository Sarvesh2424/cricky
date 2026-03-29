"use client";

import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            router.push("/login");
          });
        },
      },
    });
  };

  return (
    <div className="bg-violet-900 min-w-screen p-4">
        <h1 className="text-white text-5xl">Cricky!</h1>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default NavBar;
