import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useOutletContext } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { API, DEV_API } from "../../scripts/globals";
import { logger } from "../../scripts/logger";

import LoadingEvents from "../Loaders/LoadingEvents";
import ErrorLoadingEvents from "../Errors/ErrorLoadingStories";
import ScrollToTopButton from "../ScrollToTop";

import AddPost from "./Admin/AddPost";
import Post from "../Post/Post";

import { fetchWithCache } from "../../scripts/cache";

import { useAuth } from "../hooks/useAuth";

const Content = ({ latest = false }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const { type, latestStory } = useOutletContext();

  const navigate = useNavigate();

  let API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/${type}/${id}`
      : `${DEV_API}/${type}/${id}`;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function onDeletePost(postId) {
    setData((prev) => prev.filter((p) => p.id !== postId));
  }

  function onAddPost(post) {
    setData((prev) => [...prev, post]);
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const raw = await fetchWithCache(API_CALL);
        setData(raw);
        if (latest) navigate(`/${type}s/${latestStory}`);
        if (
          import.meta.env.MODE !== "development" &&
          user?.username !== "mohsaid99"
        ) {
          await logger(user?.username, `${type} | ${id}`);
        }
      } catch {
        setData(null);
        setError("Error Getting data");
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [id, API_CALL, user?.username, type, latest, navigate, latestStory]);

  if (isLoading) return <LoadingEvents />;
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
          <AddPost
            id={latest ? data.length : id}
            fromType={type}
            onAddPost={onAddPost}
          />
        )}
        <ScrollToTopButton />
      </>
    );
};

export default Content;
