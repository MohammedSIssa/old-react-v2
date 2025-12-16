import Story from "./Story";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import AddStoryBox from "./pages/Admin/AddStoryBox";

const Stories = ({ data, type, onDeleteStory }) => {
  const { user } = useContext(UserContext);
  return (
    <div
      className="stories scroll-snap-x mt-8 flex h-47 w-full snap-mandatory items-center gap-8 overflow-x-auto overflow-y-hidden scroll-smooth border-0 border-b p-5 py-10 md:mt-18"
      dir="rtl"
    >
      {user?.role === 1 && <AddStoryBox type={type} count={data.length + 1} />}

      {[...data].map((item, idx) => (
        <Story item={item} idx={idx} key={idx} onDeleteStory={onDeleteStory} />
      ))}
    </div>
  );
};

export default Stories;
