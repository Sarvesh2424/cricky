"use client";

import { authClient } from "@/lib/authClient";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function NavBar() {
  const pathName = usePathname();
  const router = useRouter();
  const [loggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            router.push("/login");
          });
        },
      },
    });
    setIsLoggingOut(false);
  };

  return (
    <div className="bg-violet-900 max-w-screen p-4 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-12">
        <h1 className="text-white text-5xl">Cricky!</h1>
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="text-white text-lg hover:cursor-pointer">
              Home
            </button>
            {pathName == "/" && <hr className="text-white w-full" />}
          </Link>
          <Link href={"/feed"}>
            <button className="text-white text-lg hover:cursor-pointer">
              Feed
            </button>
            {pathName == "/feed" && <hr className="text-white w-full hx `" />}
          </Link>
        </div>
      </div>

      <button
        disabled={loggingOut}
        className={`text-lg text-red-500 ${loggingOut && "hover:cursor-wait"} flex gap-2 items-center hover:cursor-pointer hover:bg-red-300 transition-colors p-2 bg-red-200 rounded-lg`}
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
