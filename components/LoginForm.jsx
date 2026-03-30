"use client";

import { authClient } from "@/lib/authClient";
import loginReducer from "@/reducers/loginReducer";
import { Eye, EyeClosed } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

function LoginForm() {
  const { data: session, isPending } = authClient.useSession();
  const [loginState, dispatch] = useReducer(loginReducer, {
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      if (session) {
        router.replace("/");
      }
    };
    checkLogin();
  }, [session]);

  async function emailLogin() {
    setLoading(true);
    const { data, error } = await authClient.signIn.email(
      {
        email: loginState.email,
        password: loginState.password,
      },
      {
        onSuccess: (ctx) => {
          router.replace("/");
        },
        onError: (ctx) => {
          toast.error("Error logging in!");
        },
      },
    );
    setLoading(false);
  }

  async function googleLogin() {
    setLoading(true);
    const { data, error } = await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
      },
      {
        onError: (ctx) => {
          toast.error("Error logging in!");
        },
      },
    );
    setLoading(false);
  }

  return (
    <>
      {isPending ? (
        <div className="rounded-full animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
      ) : (
        <>
          <h1 className="text-black text-3xl">Login</h1>
          <form className="flex flex-col items-center justify-center text-black mt-12 gap-2">
            <label className="w-full text-left">Email</label>
            <div className="w-full">
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", email: e.target.value })
                }
                value={loginState.email}
                type="email"
                placeholder="Enter email..."
                className="border border-black p-2 rounded-lg "
              />
            </div>

            <label className="mt-2 text-left w-full">Password</label>
            <div className="flex gap-2">
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_PASSWORD", password: e.target.value })
                }
                value={loginState.password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password..."
                className="border border-black p-2 rounded-lg"
              />
              {showPassword ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="hover:cursor-pointer"
                >
                  <EyeClosed />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => !prev);
                  }}
                  className="hover:cursor-pointer"
                >
                  <Eye />
                </button>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                emailLogin();
              }}
              className={`bg-green-500 rounded-lg p-2 w-full ${loading && "hover:cursor-wait"} text-white mt-4 hover:bg-green-600 hover:transition-colors hover:cursor-pointer`}
            >
              Login
            </button>
            <p className="mt-4">OR</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                googleLogin();
              }}
              className="mt-2 p-2 bg-red-500 flex items-center justify-center gap-2 text-white w-full rounded-lg hover:bg-red-600 hover:transition-colors hover:cursor-pointer"
            >
              Continue with <GoogleIcon />
            </button>
          </form>
          <p className="mt-12 flex gap-2">
            New to Cricky? Click{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-blue-500 hover:cursor-pointer"
            >
              here
            </button>{" "}
            to register
          </p>
        </>
      )}
    </>
  );
}

export default LoginForm;
