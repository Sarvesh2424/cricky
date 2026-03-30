import RegisterForm from "@/components/RegisterForm";
import { Toaster } from "react-hot-toast";

function Register() {
  return (
    <>
      <Toaster position="bottom-right"/>
      <div className="min-h-screen flex bg-violet-900">
        <div className="w-1/2 min-h-screen flex items-center justify-center">
          <h1 className="text-white text-6xl">Cricky!</h1>
        </div>
        <div className="bg-white flex flex-col items-center justify-center w-1/2 min-h-screen">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Register;
