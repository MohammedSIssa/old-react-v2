import { HashRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";

import "./custom.css";

// ===== static imports (always needed) =====
import NavBar from "./components/NavBar";
import RequireAuth from "./components/Auth/RequireAuth";
import RequireUnAuth from "./components/Auth/RequireUnAuth";

import { UserContext } from "./context/UserContext";
import { loadUser } from "./scripts/localStorage";

// ===== lazy-loaded pages (dynamic imports) =====
const Homepage = lazy(() => import("./components/pages/Homepage"));
const ErrorPage = lazy(() => import("./components/Errors/ErrorPage"));
const Login = lazy(() => import("./components/pages/Login"));

const Stats = lazy(() => import("./components/pages/Stats"));
const Stat = lazy(() => import("./components/pages/Stat"));
const LandStats = lazy(() => import("./components/pages/LandStats"));

const Special = lazy(() => import("./components/pages/Special"));
const SpecialBox = lazy(() => import("./components/pages/SpecialBox"));
const LandSpecial = lazy(() => import("./components/pages/LandSpecial"));

const Admin = lazy(() => import("./components/pages/Admin/Admin"));
const Logs = lazy(() => import("./components/pages/Admin/Logs"));
const AddPost = lazy(() => import("./components/pages/Admin/AddPost"));
const AddStory = lazy(() => import("./components/pages/Admin/AddStory"));
const UpdatePost = lazy(() => import("./components/pages/Admin/UpdatePost"));
const UpdateStory = lazy(() => import("./components/pages/Admin/UpdateStory"));

const ServerContent = lazy(() => import("./components/pages/ServerContent"));
const Content = lazy(() => import("./components/pages/Content"));
const LandServer = lazy(() => import("./components/pages/LandServer"));

function App() {
  const [user, setUser] = useState(loadUser);

  return (
    <UserContext value={{ user, setUser }}>
      <HashRouter>
        <NavBar />

        {/* Suspense handles all lazy-loaded routes */}
        <Suspense fallback={<div></div>}>
          <Routes>
            {/* Home */}
            <Route path="/" element={<Homepage />} />

            {/* Stats */}
            <Route path="/stats" element={<Stats />}>
              <Route index element={<LandStats />} />
              <Route path="latest" element={<Stat latest />} />
              <Route path=":id" element={<Stat />} />
            </Route>

            {/* Special (role 2) */}
            <Route element={<RequireAuth role={2} />}>
              <Route path="special" element={<Special />}>
                <Route index element={<LandSpecial />} />
                <Route path="latest" element={<SpecialBox latest />} />
                <Route path=":id" element={<SpecialBox />} />
              </Route>
            </Route>

            {/* Admin (role 1) */}
            <Route element={<RequireAuth role={1} />}>
              <Route path="admin" element={<Admin />}>
                <Route path="logs" element={<Logs />} />
                <Route path="add/post" element={<AddPost />} />
                <Route path="add/story" element={<AddStory />} />
                <Route path="update/post/:id" element={<UpdatePost />} />
                <Route path="update/story/:id" element={<UpdateStory />} />
              </Route>
            </Route>

            {/* Auth */}
            <Route element={<RequireUnAuth />}>
              <Route path="login" element={<Login />} />
            </Route>

            {/* Dynamic content by type */}
            <Route path="/:type" element={<ServerContent />}>
              <Route index element={<LandServer />} />
              <Route path="latest" element={<Content latest />} />
              <Route path=":id" element={<Content />} />
            </Route>

            {/* 404 */}
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </UserContext>
  );
}

export default App;
