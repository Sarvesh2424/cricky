"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { authClient } from "@/lib/authClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

async function getPosts() {
  const response = await fetch("/api/get-posts");
  return response.json();
}

function PostsList() {
  const session = authClient.useSession();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const router = useRouter();

  useEffect(() => {
    const checkLogin = () => {
      if (!session?.data?.session) {
        router.replace("/login");
      }
    };
    checkLogin();
  }, [session]);

  return (
    <>
      {postsQuery.isPending ? (
        <div className="rounded-full animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
      ) : (
        <>
          {postsQuery.data.length === 0 ? (
            <p className="text-lg">Umm.. The feed is empty...</p>
          ) : (
            <div className="flex flex-col gap-4 w-1/3">
              {postsQuery.data.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default PostsList;
