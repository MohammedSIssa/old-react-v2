import { useState } from "react";

import Post from "../../Post/Post";

import { API, DEV_API } from "../../../scripts/globals";

import { useAuth } from "../../hooks/useAuth";

import { deleteFromCache } from "../../../scripts/cache";

export default function AddPost({ id = null, fromType = null, onAddPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState("");
  const [special, setSpecial] = useState(false);
  const [secret, setSecret] = useState(false);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const { user } = useAuth();

  const API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/${fromType}/${id}`
      : `${DEV_API}/${fromType}/${id}`;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setFeedback("Adding to database..");
      setLoading(true);
      if (title.trim() !== "" || body.trim() !== "" || images.trim() !== "") {
        const res = await fetch(API_CALL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.apikey}`,
          },
          body: JSON.stringify({
            title,
            body,
            storyid: +id,
            images: images.trim() !== "" ? images.trim().split(" ") : [],
            type: fromType,
            special,
            secret,
          }),
        });

        if (!res.ok) {
          throw new Error("Error saving data..");
        }
        if (res.ok) {
          const createdPost = await res.json();
          console.log(createdPost);
          onAddPost(createdPost);
        }
      } else {
        setFeedback("Can't add a post with the current inputs");
      }

      setBody("");
      setTitle("");
      setImages("");
      setLoading(false);
      setFeedback("Saved Data.");
      deleteFromCache(API_CALL);
    } catch (error) {
      console.error(error);
      setFeedback("Error saving data");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <form
        method="POST"
        className="flex max-w-[500px] min-w-[300px] flex-col gap-4 border border-r-0 border-l-0 p-10 md:rounded-xl md:border"
        style={{
          backgroundColor: "var(--story-bg-color)",
          borderColor: "var(--story-border-color)",
        }}
        onSubmit={handleSubmit}
      >
        {id !== null && (
          <h1
            style={{ color: "var(--font-color)" }}
            className="text-2xl font-bold"
            dir="ltr"
          >
            Add a post for {fromType} {id}
          </h1>
        )}
        <hr style={{ borderColor: "var(--story-border-color)" }} />

        <label htmlFor="title" dir="ltr">
          Title:
        </label>
        <input
          disabled={loading}
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-lg p-2 px-5 text-2xl font-bold focus:outline-0 disabled:opacity-30"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
        />
        <label htmlFor="body" dir="ltr">
          Body:
        </label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="rounded-lg p-2 px-5 focus:outline-0 disabled:opacity-30"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
          disabled={loading}
        />

        <label htmlFor="images" dir="ltr">
          Images:
        </label>
        <textarea
          name="images"
          id="images"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className="rounded-lg p-2 px-5 focus:outline-0 disabled:opacity-30"
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
          dir="ltr"
          disabled={loading}
        ></textarea>
        <div className="flex items-center justify-center gap-4" dir="ltr">
          <label htmlFor="add_story_isSpecial" dir="ltr">
            Golden Post?
          </label>
          <input
            type="checkbox"
            id="add_story_isSpecial"
            name="special"
            checked={special}
            value={special}
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
            checked={secret}
            value={secret}
            onChange={(e) => setSecret(e.target.checked)}
          />
        </div>
        <hr className="border-zinc-800" />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "var(--bg-color)",
            borderColor: "var(--story-border-color)",
          }}
          className="rounded-lg border border-zinc-950 bg-zinc-950 p-2 px-5 transition-all duration-100 hover:cursor-pointer hover:border hover:border-zinc-700 hover:bg-zinc-800 disabled:opacity-30"
        >
          Add Post
        </button>
        <p
          dir="ltr"
          className={
            feedback === "Saved Data."
              ? "text-green-500"
              : feedback === "Adding to database.."
                ? "text-zinc-100"
                : "text-red-500"
          }
        >
          {feedback}
        </p>
      </form>

      <p className="text-xl font-bold text-green-200">المنشور بعض الإضافة</p>
      <hr className="border-zinc-800" />

      <Post
        title={title}
        body={body}
        images={images.trim() !== "" ? images.split(" ") : []}
        fromAdmin={true}
      />
    </div>
  );
}
