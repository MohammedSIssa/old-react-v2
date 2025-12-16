import { formatTimeAgo } from "../../scripts/utils";

export default function PostTime({ postedAt }) {
  return (
    <p dir="ltr" className="time-ago text-sm text-slate-500">
      {formatTimeAgo(postedAt)}
    </p>
  );
}
