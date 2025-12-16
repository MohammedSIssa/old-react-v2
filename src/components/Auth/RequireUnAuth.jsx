import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequireUnAuth({ role }) {
  const location = useLocation();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.username || user?.role) {
      setTimeout(() => {
        navigate(location?.state?.path ?? "/");
      }, 1500);
    }
  }, [user, role, navigate, location?.state?.path]);

  return <Outlet />;
}
