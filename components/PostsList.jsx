"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";

async function getPosts() {
  const response = await fetch("/api/get-posts");
  return response.json();
}

function PostsList() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  return (
    <>
      {postsQuery.isPending ? (
        <div className="rounded-full animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
      ) : (
        <div className="flex flex-col gap-4 w-1/3">
          {postsQuery.data.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default PostsList;
