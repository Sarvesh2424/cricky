function PostSkeleton() {
  return (
    <div className="p-4 flex flex-col border border-gray-300 bg-gray-100 animate-pulse rounded-xl w-full">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5"></div>
        <h1></h1>
      </div>
      <h1 className="text-2xl mt-4"></h1>
      <p className="text-lg mt-2"></p>
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <button className="text-pink-500 p-2 hover:cursor-pointer">
            <div className="h-5 w-5"></div>
          </button>
          <p></p>
        </div>
        <p></p>
      </div>
    </div>
  );
}

export default PostSkeleton;
