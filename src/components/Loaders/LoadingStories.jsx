const LoadingStories = () => {
  const placeholders = Array.from({ length: 4 });
  return (
    <div className="flex flex-col gap-5">
      <div className="stories mt-8 flex h-47 items-center gap-8 overflow-x-hidden border-0 border-b p-5 py-10 md:mt-20">
        {placeholders.map((_, idx) => (
          <div
            className="story h-full w-60 min-w-60 animate-pulse rounded-lg border p-3 px-4"
            key={idx}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingStories;
