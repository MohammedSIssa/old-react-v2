import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { API, DEV_API } from "../../../scripts/globals";

import { useAuth } from "../../hooks/useAuth";

import { deleteFromCache } from "../../../scripts/cache";

export default function UpdateStory() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("week");
  const [special, setSpecial] = useState(false);
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const { user } = useAuth();
  const { id } = useParams();

  const API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/story/${id}`
      : `${DEV_API}/story/${id}`;

  const PUT_API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/update/story/${id}`
      : `${DEV_API}/update/story/${id}`;

  const url =
    import.meta.env.MODE !== "development"
      ? `${API}/${type}/${count}`
      : `${DEV_API}/${type}/${count}`;
  const typeUrl =
    import.meta.env.MODE !== "development"
      ? `${API}/${type}`
      : `${DEV_API}/${type}`;
  useEffect(() => {
    async function fetchStoryData() {
      try {
        setFeedback("Fetching story data..");
        setLoading(true);
        const res = await fetch(API_CALL, {
          headers: {
            Authorization: `Bearer ${user.apikey}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setSummary(data.summary);
          setType(data.type);
          setCount(data.count);
          setYear(data.year);
          setSpecial(data.special);
          setFeedback("Fetched!");
        }
      } catch (error) {
        console.error(error);
        setFeedback("Error occurred..");
      } finally {
        setLoading(false);
      }
    }

    fetchStoryData();
  }, [id, API_CALL, user.apikey]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setFeedback("Updating...");
      const res = await fetch(PUT_API_CALL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.apikey}`,
        },
        body: JSON.stringify({ title, summary, year, special, type, count }),
      });
      if (!res.ok) {
        setFeedback("Failed to Update");
        throw new Error("Failed to Update");
      }
      deleteFromCache(url);
      deleteFromCache(typeUrl);
      setFeedback("Updated Successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-[300px] flex-col gap-4 rounded-xl border border-zinc-700 bg-zinc-900 p-10"
    >
      <p className="text-xl font-bold text-green-200">فورم تحديث الستوري</p>
      <hr className="border-zinc-800" />
      <label htmlFor="up_story_count" dir="ltr">
        Count:
      </label>
      <div className="flex flex-wrap gap-4" dir="ltr">
        <input
          type="number"
          id="up_story_count"
          name="count"
          value={count}
          dir="ltr"
          className="rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-20"
          onChange={(e) => setCount(e.target.value)}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-zinc-800 p-2 text-zinc-50 focus:border focus:border-zinc-600 focus:outline-0"
          id="up_story_type"
          name="up_story_type"
        >
          <option value="week">Week</option>
          <option value="goal">Goal</option>
          <option value="blog">Blog</option>
          <option value="special">Special</option>
          <option value="stat">Stat</option>
        </select>
      </div>
      <label htmlFor="up_story_title" dir="ltr">
        Title:
      </label>
      <input
        id="up_story_title"
        value={title}
        name="title"
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        autoComplete="off"
        className="rounded-lg bg-zinc-800 p-2 px-5 font-bold text-zinc-50 focus:outline-0 disabled:opacity-20"
      />
      <label htmlFor="up_story_summary" dir="ltr">
        Summary:
      </label>
      <input
        id="up_story_summary"
        value={summary}
        name="summary"
        className="rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-20"
        onChange={(e) => setSummary(e.target.value)}
        disabled={loading}
        autoComplete="off"
      />
      <label htmlFor="up_story_year" dir="ltr">
        Year:
      </label>
      <input
        id="up_story_year"
        value={year ?? ""}
        name="year"
        disabled={loading}
        autoComplete="off"
        className="rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-20"
        onChange={(e) => setYear(e.target.value)}
      />
      <div className="flex items-center justify-center gap-4">
        <input
          type="checkbox"
          id="up_story_isSpecial"
          name="special"
          value={special}
          checked={special}
          disabled={loading}
          className="rounded-lg bg-zinc-800 p-2 px-5 text-zinc-50 focus:outline-0 disabled:opacity-20"
          onChange={(e) => setSpecial(e.target.checked)}
        />
        <label htmlFor="up_story_isSpecial" dir="ltr">
          Golden Story?
        </label>
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="rounded-lg border border-zinc-950 bg-zinc-950 p-2 px-5 transition-all duration-100 hover:cursor-pointer hover:border hover:border-zinc-700 hover:bg-zinc-800"
      >
        Update Story
      </button>
      <p
        dir="ltr"
        className={
          feedback === "Updated Successfully"
            ? "text-green-500"
            : feedback === "Failed to Update"
              ? "text-red-500"
              : ""
        }
      >
        {feedback}
      </p>
    </form>
  );
}
