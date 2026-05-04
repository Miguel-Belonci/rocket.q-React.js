import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ role }) => {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user?.role || "").trim().toLowerCase();
  const requiredRole = String(role || "").trim().toLowerCase();

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
