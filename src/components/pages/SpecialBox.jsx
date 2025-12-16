import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingEvents from "../../components/Loaders/LoadingEvents";
import ErrorLoadingEvents from "../../components/Errors/ErrorLoadingStories";
import ScrollToTopButton from "../../components/ScrollToTop";
import AddPost from "./Admin/AddPost";
import { API, DEV_API } from "../../scripts/globals";
import { logger } from "../../scripts/logger";
import Post from "../../components/Post/Post";
import { fetchWithCache } from "../../scripts/cache";
import { useAuth } from "../hooks/useAuth";

export default function SpecialBox() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { id } = useParams();
  const API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/special/${id}`
      : `${DEV_API}/special/${id}`;

  function onDeletePost(postId) {
    setData((prev) => prev.filter((p) => p.id !== postId));
  }

  function onAddPost(post) {
    setData((prev) => [...prev, post]);
  }

  useEffect(() => {
    async function getSpecials() {
      try {
        setLoading(true);
        const raw = await fetchWithCache(API_CALL);
        setData(raw);

        if (
          import.meta.env.MODE !== "development" &&
          user?.username !== "mohsaid99"
        ) {
          await logger(user?.username, `Special | ${id}`);
        }
      } catch (err) {
        setData(null);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getSpecials();
  }, [id, user?.username, API_CALL]);

  if (loading) return <LoadingEvents />;
  if (error) return <ErrorLoadingEvents />;
  if (data)
    return (
      <>
        {data.map((item, idx) => (
          <Post
            key={idx}
            title={item.title}
            body={item.body}
            images={item.images}
            postId={item.id}
            special={item.special}
            secret={item.secret}
            postedAt={item.iat}
            type={item.type}
            storyId={item.storyid}
            onDeletePost={() => onDeletePost(item.id)}
          />
        ))}
        {user?.role === 1 && (
          <AddPost id={id} fromType={"special"} onAddPost={onAddPost} />
        )}
        <ScrollToTopButton />
      </>
    );
}
