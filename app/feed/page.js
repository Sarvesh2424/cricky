import NavBar from "@/components/NavBar";
import NewPostForm from "@/components/NewPostForm";
import PostsList from "@/components/PostsList";
import React from "react";
import { Toaster } from "react-hot-toast";

function Feed() {
  return (
    <>
      <Toaster position="bottom-right" />
      <NavBar />
      <div className="text-3xl w-full flex justify-center mt-8 mb-8">Feed</div>
      <div className="flex justify-center gap-24 p-8 ">
        <PostsList />
        <NewPostForm />
      </div>
    </>
  );
}

export default Feed;
