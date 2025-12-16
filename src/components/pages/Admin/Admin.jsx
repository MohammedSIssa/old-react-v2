import "./admin.css";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div
      className="flex min-h-dvh w-full flex-col flex-wrap items-center justify-center gap-5 py-25"
      dir="ltr"
    >
      <Outlet />
    </div>
  );
}
