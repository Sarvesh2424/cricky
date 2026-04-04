import LoginForm from "@/components/LoginForm";
import { Toaster } from "react-hot-toast";

function Login() {
  return (
    <>
      <Toaster position="bottom-right" />
      <div className="flex flex-col md:flex-row md:min-h-screen h-screen bg-violet-900">
        <div className="min-h-1/3 md:w-1/2 md:min-h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-white text-6xl">Cricky!</h1>
            <p className="text-lg text-gray-200 p-2 text-center">
              Track your favourite team and share your CRICKY thoughts!
            </p>
          </div>
        </div>
        <div className="bg-white flex flex-col items-center justify-center md:w-1/2 md:min-h-screen h-2/3">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

export default Login;
