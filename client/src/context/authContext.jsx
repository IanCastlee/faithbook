import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
import axios from "axios";

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("mangagamit")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://faithbook-rouge.vercel.app/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem("mangagamit", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
