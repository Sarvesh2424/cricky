"use client";

import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostCard";
import { authClient } from "@/lib/authClient";
import PostSkeleton from "./PostSkeleton";
import { useContext, useMemo } from "react";
import { modeContext } from "./QueryProvider";

async function getPosts() {
  const response = await fetch("/api/get-posts");
  return response.json();
}

function PostsList() {
  const { addMode, setAddMode } = useContext(modeContext);
  const { data: session, isPending } = authClient.useSession();
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <>
      {isPending ? (
        <div className="w-full flex items-center justify-center">
          <div className="rounded-full flex items-center justify-center animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
        </div>
      ) : (
        <>
          {!session ? (
            <p className="text-lg">Please login to view posts...</p>
          ) : (
            <>
              {postsQuery.isPending ? (
                <div className="flex md:w-1/3 flex-col gap-4 w-full">
                  {[1, 2, 3, 4].map((post) => (
                    <PostSkeleton key={post} />
                  ))}
                </div>
              ) : (
                <>
                  {postsQuery.data.length === 0 ? (
                    <p className="text-lg">Umm.. The feed is empty...</p>
                  ) : (
                    <div className="flex flex-col md:w-1/3 gap-4 w-full">
                      {postsQuery.data.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </>
              )}
              {addMode && (
                <div className="bg-black opacity-50 z-10 fixed top-0 left-0  h-screen w-screen"></div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

export default PostsList;
