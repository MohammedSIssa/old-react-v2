import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useState } from "react";

export default function AddStoryBox({ type, count }) {
  const [currentStory, setCurrentStory] = useState(count);
  const navigate = useNavigate();

  function handleStoryChange(e) {
    setCurrentStory(e.target.value);
  }

  function handleSearch() {
    navigate(`/${type}${type !== 'special' ? "s" : ""}/${currentStory}`);
  }

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <NavLink
        to={"/admin/add/story"}
        className={`story p-5 hover:brightness-110 transition-all duration-200 hover:cursor-pointer w-60 min-w-full border rounded-lg flex items-center justify-center`}
        state={{ type: type, count: count }}
      >
        <FaPlus size={50} />
      </NavLink>
      <div className="md:hidden w-full flex gap-2">
        <input
          onChange={handleStoryChange}
          type="number"
          className="bg-slate-500 grow flex items-center justify-center focus:outline-0 rounded px-2 max-w-[80%]"
        />
        <button
          onClick={handleSearch}
          className="bg-slate-500 grow flex items-center justify-center text-slate-200 rounded"
        >
          <FaSearch />
        </button>
      </div>
    </div>
  );
}
