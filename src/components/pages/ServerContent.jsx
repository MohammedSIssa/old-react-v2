import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import ErrorLoadingStories from "../Errors/ErrorLoadingStories";
import LoadingStories from "../Loaders/LoadingStories";

import { API, DEV_API } from "../../scripts/globals";

import { fetchWithCache } from "../../scripts/cache";
import Stories from "../Stories";

import { useParams } from "react-router-dom";

const StoryContent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDeleteStory(storyId) {
    setData((prev) => prev.filter((s) => s.id !== storyId));
  }

  const { type } = useParams();

  let API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/${type.slice(0, -1)}`
      : `${DEV_API}/${type.slice(0, -1)}`;

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const raw = await fetchWithCache(API_CALL);
        setData(raw);
      } catch (err) {
        setData(null);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [API_CALL]);

  if (isLoading) return <LoadingStories />;
  if (error) return <ErrorLoadingStories />;
  if (data.length === 0)
    return (
      <div className="flex h-dvh items-center justify-center p-10">
        <h1 className="text-3xl font-bold" dir="ltr">
          Server Error :/
        </h1>
      </div>
    );
  if (data)
    return (
      <div className="flex flex-col gap-5">
        <Stories
          data={data}
          type={type.slice(0, -1)}
          onDeleteStory={onDeleteStory}
        />
        <Outlet
          context={{ type: type.slice(0, -1), latestStory: data.length }}
        />
      </div>
    );
};

export default StoryContent;
