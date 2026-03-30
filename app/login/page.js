import LoginForm from "@/components/LoginForm";
import { Toaster } from "react-hot-toast";

function Login() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="min-h-screen flex bg-violet-900">
        <div className="w-1/2 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 mb-24">
            <h1 className="text-white text-6xl">Cricky!</h1>
            <p className="text-lg text-gray-200">
              Track your favourite team and share your CRICKY thoughts!
            </p>
          </div>
        </div>
        <div className="bg-white flex flex-col items-center justify-center w-1/2 min-h-screen">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
