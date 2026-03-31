"use client";

import { authClient } from "@/lib/authClient";
import postReducer from "@/reducers/postReducer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";
import toast from "react-hot-toast";

async function post(postData) {
  const response = await fetch("/api/add-post", {
    method: "POST",
    body: JSON.stringify(postData),
  });
  return response.json();
}

function NewPostForm() {
  const queryClient = useQueryClient();
  const { data: session, isPending } = authClient.useSession();
  const [postFormState, dispatch] = useReducer(postReducer, {
    title: "",
    content: "",
  });
  const postMutation = useMutation({
    mutationFn: post,
    onSuccess: (ctx) => {
      if (ctx.status == 201) {
        toast.success("Post successful!");
        dispatch({ type: "SET_TITLE", title: "" });
        dispatch({ type: "SET_CONTENT", content: "" });
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      } else {
        toast.error("Cannot post!");
      }
    },
    onError: (ctx) => {
      toast.error("Cannot post!");
    },
  });

  const handlePost = () => {
    if (!postFormState.title || !postFormState.content) {
      toast.error("Title or content cannot be empty!");
      return;
    }
    if (postFormState.title.length > 50) {
      toast.error("Title cannot be more than 50 characters!");
      return;
    }
    if (postFormState.content.length > 500) {
      toast.error("Content cannote be more than 500 characters!");
      return;
    }
    postMutation.mutate({
      title: postFormState.title,
      content: postFormState.content,
      userId: session.user.id,
    });
  };

  return (
    <>
      {session && (
        <form className="flex flex-col w-1/4 gap-2  rounded-xl border border-gray-300 bg-gray-100 p-4 h-max">
          <h1 className="text-2xl">Share your "CRICKY" thoughts!</h1>
          <label className="mt-8">Title</label>
          <input
            onChange={(e) =>
              dispatch({ type: "SET_TITLE", title: e.target.value })
            }
            value={postFormState.title}
            className="border p-2 focus:ring-2 focus:border-none focus:outline-none focus:ring-violet-900 border-black rounded-lg"
            type="text"
            placeholder="Enter title..."
          />
          <label className="mt-4">Content</label>
          <textarea
            onChange={(e) =>
              dispatch({ type: "SET_CONTENT", content: e.target.value })
            }
            value={postFormState.content}
            className="border p-2 focus:ring-2 focus:border-none focus:outline-none focus:ring-violet-900 border-black rounded-lg"
            rows={5}
            placeholder="Enter content..."
          />
          <button
            disabled={postMutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              handlePost();
            }}
            className={`p-2 mt-4 rounded-lg hover:bg-violet-950 hover:cursor-pointer transition-colors bg-violet-900 text-white ${postMutation.isPending && "hover:cursor-wait"}`}
            type="submit"
          >
            {postMutation.isPending ? "Posting..." : "Post"}
          </button>
        </form>
      )}
    </>
  );
}

export default NewPostForm;
