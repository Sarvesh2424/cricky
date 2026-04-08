"use client";

import { Plus } from "lucide-react";
import { useContext } from "react";
import { modeContext } from "./QueryProvider";

function NewPostButton() {
  const { addMode, setAddMode } = useContext(modeContext);
  return (
    <button
      onClick={() => setAddMode((prev) => !prev)}
      className="fixed md:hidden bottom-12 right-8 p-2 bg-white rounded-lg shadow-violet-900 shadow-2xl text-violet-900"
    >
      <Plus className="w-10 h-10" />
    </button>
  );
}

export default NewPostButton;
