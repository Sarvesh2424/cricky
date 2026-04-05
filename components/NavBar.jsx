"use client";

import { authClient } from "@/lib/authClient";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function NavBar() {
  const { data: session, isPending } = authClient.useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [loggingOut, setIsLoggingOut] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="bg-violet-900 w-full p-4 flex items-center shadow-2xl">
      <div className="flex items-center justify-between w-full relative">
        <div className="flex justify-between md:justify-normal md:gap-12 w-full md:w-auto">
          <h1 className="text-white text-5xl">Cricky!</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen((prev) => !prev);
            }}
            className="text-white md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className="hidden md:flex items-center gap-4">
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

        {session ? (
          <button
            disabled={loggingOut}
            className={`hidden text-lg text-red-500 ${loggingOut && "hover:cursor-wait"} md:flex  gap-2 items-center hover:cursor-pointer hover:bg-red-300 transition-colors p-2 bg-red-200 rounded-lg`}
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            <LogOut />
            {"Log Out"}
          </button>
        ) : (
          <Link href={"/login"}>
            <button
              className={` hidden text-lg h-min md:flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 transition-colors p-2 bg-white rounded-lg`}
            >
              <LogIn />
              Log In
            </button>
          </Link>
        )}
        {menuOpen && (
          <div className="absolute right-0 top-10 bg-violet-950 p-2 rounded-lg flex flex-col">
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
              {pathName == "/feed" && <hr className="text-white w-full" />}
            </Link>
            {session ? (
              <button
                disabled={loggingOut}
                className={`text-lg  text-red-500 mt-2 ${loggingOut && "hover:cursor-wait"} flex gap-2 items-center hover:cursor-pointer hover:bg-red-300 transition-colors p-2 bg-red-200 rounded-lg`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                <LogOut />
                Log Out
              </button>
            ) : (
              <Link href={"/login"}>
                <button
                  className={`text-lg mt-2 flex gap-2 items-center hover:cursor-pointer hover:bg-gray-100 transition-colors p-2 bg-white rounded-lg`}
                >
                  <LogIn />
                  Log In
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
