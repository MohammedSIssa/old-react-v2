import { useState, useEffect } from "react";
import { fetchWithCache } from "../../scripts/cache";
import Stories from "../../components/Stories";

import ErrorLoadingStories from "../../components/Errors/ErrorLoadingStories";
import LoadingStories from "../../components/Loaders/LoadingStories";

import { API, DEV_API } from "../../scripts/globals";

import { Outlet } from "react-router-dom";

const Special = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let API_CALL =
    import.meta.env.MODE !== "development"
      ? API + "/special"
      : DEV_API + "/special";

  function onDeleteStory(storyId) {
    setData((prev) => prev.filter((s) => s.id !== storyId));
  }

  useEffect(() => {
    async function getSpecials() {
      try {
        const raw = await fetchWithCache(API_CALL);
        setData(raw);
      } catch (err) {
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    getSpecials();
  }, [API_CALL]);

  if (loading) return <LoadingStories />;
  if (error) return <ErrorLoadingStories />;

  return (
    <div className="flex flex-col gap-5">
      <Stories data={data} type={"special"} onDeleteStory={onDeleteStory} />
      <Outlet context={{ latestStory: data.length }} />
    </div>
  );
};

export default Special;
