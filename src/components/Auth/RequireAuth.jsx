import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function RequireAuth({ role }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.username || (user?.role !== 1 && user?.role !== role)) {
      navigate("/login");
    }
  }, [user, role, navigate]);

  // You might want to return null or a loading spinner while redirecting
  if (!user?.username || (user?.role !== 1 && user?.role !== role)) {
    return null;
  }

  return <Outlet />;
}
