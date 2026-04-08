import NavBar from "@/components/NavBar";
import NewPostButton from "@/components/NewPostButton";
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
      <div className="flex md:flex-row flex-col w-full justify-center gap-24 p-8 ">
        <PostsList />
        <NewPostForm />
        <NewPostButton/>
      </div>
    </>
  );
}

export default Feed;
