import { stats } from "./stats-data";
import Stories from "../../components/Stories";
import { Outlet } from "react-router-dom";

const Stats = () => {
  return (
    <div className="flex flex-col gap-5">
      <Stories type={"stat"} data={[...stats].reverse()} />
      <Outlet context={{ latestStory: stats.length }} />
    </div>
  );
};

export default Stats;
