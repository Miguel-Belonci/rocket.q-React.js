import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ role }) => {
  const { signed, loading, user } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return signed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
