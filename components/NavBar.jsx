"use client";

import { authClient } from "@/lib/authClient";
import { LogOut } from "lucide-react";
import Link from "next/link";
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
    <div className="bg-violet-900 min-w-screen p-4 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-12">
        <h1 className="text-white text-5xl">Cricky!</h1>
        <div className="flex items-center gap-4">
          <button className="text-white text-lg">Home</button>
          <Link href={"/feed"}>
            <button className="text-white text-lg">Feed</button>
          </Link>
        </div>
      </div>

      <button
        className="text-lg text-red-500 flex gap-2 items-center hover:cursor-pointer hover:bg-red-300 transition-colors p-2 bg-red-200 rounded-lg"
        onClick={(e) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        <LogOut />
        Log Out
      </button>
    </div>
  );
}

export default NavBar;
