import { createContext, useState, useEffect } from "react";
import ApiService from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const LocalStorageData = () => {
      const storageuser = localStorage.getItem("@Auth:user");
      const storageToken = localStorage.getItem("@Auth:token");

      if (storageuser && storageToken) {
        setUser(storageuser);
      }
      LocalStorageData();
    };
  }, []);

  async function signIn(email, password) {
    const response = await ApiService.auth(email, password);

    if (response.data.error) {
      alert(response.data.error);
    } else {
      setUser(response.data.user);
      localStorage.setItem("@Auth:token", response.data.token);
      localStorage.setItem("@Auth:user", response.data.user);
    }
  }
};

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
