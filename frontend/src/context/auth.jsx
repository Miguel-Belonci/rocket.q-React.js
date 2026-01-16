import { createContext, useState, useEffect } from "react";
import ApiService from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const LoadingStorageData = () => {
      const storageuser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageuser && storageToken) {
        setUser(storageuser);
      }
    };
    LoadingStorageData();
  }, []);

  async function signIn(email, password) {
    const response = await ApiService.auth(email, password);

    if (response.error) {
      alert(response.error);
    } else {
      setUser(response.user);
      localStorage.setItem("@Auth:token", response.token);
      localStorage.setItem("@Auth:user", JSON.stringify(response.user));
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


