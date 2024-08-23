import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!localStorage.getItem("authToken")) {
    // Redirige vers la page de connexion si non authentifié
    return <Navigate to="/login" />;
  }

  // Affiche les enfants (routes protégées) si authentifié
  return <Outlet />;
};

export default ProtectedRoute;
