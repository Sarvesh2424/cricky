"use client";

import { Heart, UserCircle } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { authClient } from "@/lib/authClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

dayjs.extend(relativeTime);

async function updateLikes(data) {
  const response = await fetch("/api/update-likes", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

async function getUser(id) {
  const response = await fetch(`/api/get-user/${id}`);
  return response.json();
}

function PostCard({ post }) {
  const queryClient = useQueryClient();
  const session = authClient.useSession();
  const userQuery = useQuery({
    queryKey: [post.userId],
    queryFn: () => getUser(post.userId),
  });
  const likeMutation = useMutation({
    mutationFn: updateLikes,
    onSuccess: (ctx) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  return (
    <div className="p-4 flex flex-col border border-gray-300 bg-gray-100  rounded-xl w-full">
      {userQuery.isPending ? (
        <div className="rounded-full animate-spin w-10 h-10 border-2 border-l-0 border-black"></div>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <UserCircle />
            <h1>{userQuery.data?.name}</h1>
          </div>
          <h1 className="text-2xl mt-4">{post.title}</h1>
          <p className="text-lg mt-2">{post.content}</p>
          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2">
              {post.likes.includes(session?.data?.session?.userId) ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    likeMutation.mutate({
                      id: post.id,
                      likes: post.likes.filter(
                        (like) => like !== session?.data?.session?.userId,
                      ),
                    });
                  }}
                  className="text-pink-500 hover:cursor-pointer"
                >
                  <Heart fill="#ec4899" />
                </button>
              ) : (
                <button
                  className="hover:cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    likeMutation.mutate({
                      id: post.id,
                      likes: [...post.likes, session?.data?.session?.userId],
                    });
                  }}
                >
                  <Heart />
                </button>
              )}

              <p>{post.likes.length}</p>
            </div>
            <p>{dayjs(post.createdAt).fromNow()}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default PostCard;
