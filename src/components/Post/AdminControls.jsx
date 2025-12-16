import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { NavLink } from "react-router-dom";

import { API, DEV_API } from "../../scripts/globals";

import { useAuth } from "../hooks/useAuth";
import { deleteFromCache } from "../../scripts/cache";

export default function AdminControls({ postId, type, onDeletePost, storyId }) {
  const { user } = useAuth();
  const API_CALL =
    import.meta.env.MODE !== "development"
      ? `${API}/posts/delete/${postId}`
      : `${DEV_API}/posts/delete/${postId}`;

  const url =
    import.meta.env.MODE !== "development"
      ? `${API}/${type}/${storyId}`
      : `${DEV_API}/${type}/${storyId}`;
  async function deletePostById() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete post ${postId}`,
    );
    if (confirmDelete) {
      console.log("Remove from cache..");
      deleteFromCache(url);
      onDeletePost();
      await fetch(API_CALL, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.apikey}`,
        },
      });
      console.log("Remove from cache..");
      deleteFromCache(url);
      onDeletePost();
    }
  }
  return (
    <p className="story-year absolute top-[-50px] left-2 flex items-center gap-2 px-3 py-1">
      <NavLink
        to={`/admin/update/post/${postId}`}
        className={"rounded-lg bg-blue-700 p-2"}
      >
        <MdEdit />
      </NavLink>
      <button
        onClick={deletePostById}
        className="rounded-lg bg-red-500 p-2 px-2 text-white hover:cursor-pointer hover:brightness-120"
      >
        <MdDelete />
      </button>
    </p>
  );
}
