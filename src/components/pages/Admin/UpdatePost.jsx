import { useState, useEffect } from "react";
import Post from "../../../components/Post/Post";

import { useParams } from "react-router-dom";

import { API, DEV_API } from "../../../scripts/globals";
import { deleteFromCache } from "../../../scripts/cache";

import { useAuth } from "../../hooks/useAuth";

export default function UpdatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [storyid, setStoryid] = useState(0);
  const [images, setImages] = useState("");
  const [type, setType] = useState("week");
  const [special, setSpecial] = useState(false);
  const [secret, setSecret] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const { id } = useParams();

  const API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/posts/${id}`
      : `${DEV_API}/posts/${id}`;

  const url =
    import.meta.env.MODE !== "development"
      ? `${API}/${type}/${storyid}`
      : `${DEV_API}/${type}/${storyid}`;

  useEffect(() => {
    async function fetchPostData() {
      setFeedback("Fetching post from database..");
      setIsLoading(true);

      const res = await fetch(API_CALL, {
        headers: {
          Authorization: `Bearer ${user.apikey}`,
        },
      });
      const data = await res.json();

      setTitle(data.title);
      setBody(data.body);
      setStoryid(data.storyid);
      setType(data.type);
      setSpecial(data.special);
      setSecret(data.secret);

      setFeedback("Fetched Post!");
      setIsLoading(false);
      setImages(data.images.join(" "));
    }

    fetchPostData();
  }, [id, API_CALL, user.apikey]);

  async function updatePost(e) {
    e.preventDefault();
    setFeedback("Updating post..");
    setIsLoading(true);
    console.log({
      title,
      body,
      storyid,
      type,
      images: images.trim() !== "" ? images.split(" ") : [],
    });
    const API_CALL =
      import.meta.env.MODE !== "development"
        ? `${API}/update/posts/${id}`
        : `${DEV_API}/update/posts/${id}`;
    const res = await fetch(API_CALL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.apikey}`,
      },
      body: JSON.stringify({
        title,
        body,
        storyid,
        type,
        images: images.trim() !== "" ? images.split(" ") : [],
        special,
        secret,
      }),
    });

    if (!res.ok) {
      setFeedback("Error happened");
      throw new Error("Unable to update post");
    } else {
      deleteFromCache(url);
      setFeedback("Post updated successfully!");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <form
        onSubmit={updatePost}
        className="flex max-w-[600px] min-w-[300px] flex-col gap-4 rounded-xl border border-zinc-700 bg-zinc-900 p-10"
        style={{
          backgroundColor: "var(--story-bg-color)",
          borderColor: "var(--story-border-color)",
        }}
      >
        <p className="text-xl font-bold text-green-200">فورم تحديث المنشورات</p>
        <hr style={{ borderColor: "var(--story-border-color)" }} />
        <div className="flex flex-wrap items-center gap-5" dir="ltr"></div>

        <label htmlFor="post_type" dir="ltr">
          Type: {type}
        </label>
        <select
          id="post_type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-zinc-800 p-2 text-zinc-50 focus:border focus:border-zinc-600 focus:outline-0"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
          disabled={isLoading}
        >
          <option value="week">Week</option>
          <option value="goal">Goal</option>
          <option value="blog">Blog</option>
          <option value="special">Special</option>
          <option value="stat">Stats</option>
        </select>

        <label htmlFor="story_id" dir="ltr">
          Story ID:{" "}
        </label>
        <input
          type="number"
          id="story_id"
          value={storyid}
          onChange={(e) => setStoryid(e.target.value)}
          className="rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-30"
          disabled={isLoading}
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
        />

        <label htmlFor="post_title" dir="ltr">
          Title:{" "}
        </label>
        <input
          type="text"
          name="title"
          id="post_title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg bg-zinc-800 p-2 px-5 text-xl font-bold text-zinc-50 focus:outline-0 disabled:opacity-30"
          disabled={isLoading}
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
        />
        <label htmlFor="post_body" dir="ltr">
          Body:{" "}
        </label>
        <textarea
          type="text"
          name="body"
          id="post_body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="min-h-fit rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-30"
          disabled={isLoading}
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
        ></textarea>

        <label htmlFor="post_images" dir="ltr">
          Images:{" "}
        </label>
        <textarea
          dir="ltr"
          name="images"
          type="text"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="min-h-fit rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-30"
          disabled={isLoading}
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
          id="post_images"
        ></textarea>
        <div className="flex items-center justify-center gap-4" dir="ltr">
          <label htmlFor="add_story_isSpecial" dir="ltr">
            Golden Post?
          </label>
          <input
            type="checkbox"
            id="add_story_isSpecial"
            name="special"
            checked={special ?? false}
            value={special ?? false}
            onChange={(e) => setSpecial(e.target.checked)}
          />
        </div>
        <div className="flex items-center justify-center gap-4" dir="ltr">
          <label htmlFor="add_story_isSecret" dir="ltr">
            Secret Post?
          </label>
          <input
            type="checkbox"
            id="add_story_isSecret"
            name="special"
            checked={secret ?? false}
            value={secret ?? false}
            onChange={(e) => setSecret(e.target.checked)}
          />
        </div>
        <hr className="border-zinc-800" />
        <button
          onClick={updatePost}
          disabled={isLoading}
          className="rounded-lg border border-zinc-950 bg-zinc-950 p-2 px-5 transition-all duration-100 hover:cursor-pointer hover:border hover:border-zinc-700 hover:bg-zinc-800"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
        >
          Update
        </button>
        <p dir="ltr">{feedback}</p>
      </form>

      <p className="text-xl font-bold text-green-200">المنشور بعض التعديلات</p>
      <hr className="border-zinc-800" />

      {isLoading || (
        <Post
          title={title}
          body={body}
          images={images.trim() !== "" ? images.split(" ") : []}
          fromAdmin={true}
        />
      )}
    </div>
  );
}
