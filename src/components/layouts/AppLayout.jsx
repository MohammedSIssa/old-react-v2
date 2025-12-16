import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

export default function AppLayout() {
  return (
    <>
      <NavBar />
      <div className="relative bg-linear-to-br from-[#120b26] via-[#130d33] to-[#320e41]">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_60%)]"></div>
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.2),transparent_65%)]"></div>
        <Outlet />
      </div>
    </>
  );
}
