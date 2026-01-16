import { useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return signed ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
