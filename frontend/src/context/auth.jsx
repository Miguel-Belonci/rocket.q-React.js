import { useState, useEffect } from "react";
import ApiService from "../services/api";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const LoadingStorageData = async () => {
      const storageToken = localStorage.getItem("@Auth:token");

      if (!storageToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await ApiService.getProfile();
        setUser(response.user);
        localStorage.setItem("@Auth:user", JSON.stringify(response.user));
      } catch (error) {
        console.log("Erro ao carregar usuario autenticado", error);
        localStorage.removeItem("@Auth:token");
        localStorage.removeItem("@Auth:user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    LoadingStorageData();
  }, []);

  function saveSession(response) {
    setUser(response.user);
    localStorage.setItem("@Auth:token", response.token);
    localStorage.setItem("@Auth:user", JSON.stringify(response.user));
  }

  async function signIn(email, password) {
    const response = await ApiService.auth(email, password);

    if (response.error) {
      return response.error;
    } else {
      saveSession(response);
    }
  }

  async function signInWithGoogle(credential) {
    const response = await ApiService.authWithGoogle(credential);

    if (response.error) {
      return response.error;
    } else {
      saveSession(response);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loading,
        signIn,
        signInWithGoogle,
        setUser,
        isAdmin: String(user?.role || "").trim().toLowerCase() === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
