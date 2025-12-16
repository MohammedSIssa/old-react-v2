import { NavLink } from "react-router-dom";

import { API, DEV_API } from "../scripts/globals";

import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { useAuth } from "./hooks/useAuth";
import { deleteFromCache } from "../scripts/cache";

export default function Story({ item, idx, onDeleteStory }) {
  const goldStory = item.special;
  const { user } = useAuth();

  const API_CALL =
    import.meta.env.MODE !== "development"
      ? API + "/delete/story/" + item.id
      : DEV_API + "/delete/story/" + item.id;

  const url =
    import.meta.env.MODE !== "development"
      ? API + "/" + item.type + "/" + item.count
      : DEV_API + "/" + item.type + "/" + item.count;

  const typeUrl =
    import.meta.env.MODE !== "development"
      ? API + "/" + item.type
      : DEV_API + "/" + item.type;

  async function deleteStory() {
    const confirmDelete = window.confirm(`Delete story?`);
    if (confirmDelete) {
      onDeleteStory(item.id);
      deleteFromCache(url);
      deleteFromCache(typeUrl);
      const res = await fetch(API_CALL, {
        method: "DELETE",
        headers: { Authorization: `Bearer: ${user.apikey}` },
      });

      if (res.ok) {
        console.log("Deleted Successfully");
      }
      if (!res.ok) {
        alert("Could not delete the story");
      }
    }
  }

  return (
    <>
      <NavLink
        className={`story relative h-full w-60 min-w-60 snap-start rounded-lg border p-3 px-4 ${
          goldStory ? "gold" : ""
        }`}
        key={idx}
        to={`/${item.type}${item.type !== "special" ? "s" : ""}/${item.count}`}
      >
        <h1 className="text-lg font-bold">{item.title}</h1>
        <p className="mt-1 text-xs">{item?.summary ? item.summary : "🔴"}</p>
        <p className="story-count absolute bottom-1 left-3 font-bold italic">
          #{item.count}
        </p>
        <p
          className={`story-year absolute top-[-21px] left-3 skew-x-2 rounded-md p-px px-2.5 font-bold italic ${
            goldStory
              ? "bg-yellow-400 text-yellow-900"
              : "bg-rose-700 text-zinc-50"
          }`}
        >
          {item.year}
        </p>
      </NavLink>
      {user?.role === 1 && (
        <>
          ↔️
          <div className="flex w-5 flex-col items-center justify-center gap-2">
            <NavLink
              to={`/admin/update/story/${item.id}`}
              className={
                "rounded bg-blue-700 p-1 transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-blue-700"
              }
              state={{ type: item.type, count: item.count }}
            >
              <MdEdit />
            </NavLink>
            <button
              onClick={deleteStory}
              className={
                "rounded bg-red-500 p-1 transition-all duration-300 hover:cursor-pointer hover:bg-white hover:text-red-500"
              }
            >
              <MdDelete />
            </button>
          </div>
        </>
      )}
    </>
  );
}
