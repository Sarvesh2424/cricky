"use client";

import { authClient } from "@/lib/authClient";
import registerReducer from "@/reducers/registerReducer";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";

function RegisterForm() {
  const { data: session, isPending } = authClient.useSession();
  const [registerState, dispatch] = useReducer(registerReducer, {
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  async function emailRegister() {
    if (registerState.password !== registerState.confirm) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    const name = registerState.email.split("@")[0];
    const { data, error } = await authClient.signUp.email(
      {
        email: registerState.email,
        password: registerState.password,
        name: name,
        callbackURL: "/",
      },
      {
        onSuccess: (ctx) => {
          router.replace("/");
        },
        onError: (ctx) => {
          toast.error("Error signing up!");
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
          <h1 className="text-black text-3xl">Register</h1>
          <form className="flex flex-col items-center justify-center text-black mt-12 gap-2">
            <label className="w-full text-left">Email</label>
            <div className="w-full">
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_EMAIL", email: e.target.value })
                }
                value={registerState.email}
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
                value={registerState.password}
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
            <label className="mt-2 text-left w-full">Confirm Password</label>
            <div className="flex gap-2">
              {" "}
              <input
                onChange={(e) =>
                  dispatch({ type: "SET_CONFIRM", confirm: e.target.value })
                }
                value={registerState.confirm}
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password..."
                className="border border-black p-2 rounded-lg"
              />
              {showConfirm ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirm((prev) => !prev);
                  }}
                  className="hover:cursor-pointer"
                >
                  <EyeClosed />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirm((prev) => !prev);
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
                emailRegister();
              }}
              className={`bg-green-500 rounded-lg p-2 w-full text-white mt-4 hover:bg-green-600 hover:transition-colors hover:cursor-pointer ${loading && "hover:cursor-wait"}`}
            >
              Register
            </button>
            <p className="mt-4">OR</p>
            <button className="mt-2 p-2 bg-red-500 text-white w-full rounded-lg hover:bg-red-600 hover:transition-colors hover:cursor-pointer">
              Continue with G
            </button>
          </form>
          <p className="mt-12 flex gap-2">
            Have an account? Click{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-blue-500 hover:cursor-pointer"
            >
              here
            </button>{" "}
            to login
          </p>
        </>
      )}
    </>
  );
}

export default RegisterForm;
