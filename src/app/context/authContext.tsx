"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import UserType from "@/types/UserType";

interface AuthContextProps {
  user: UserType | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedIsAdmin = localStorage.getItem("isAdmin");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(storedIsAdmin === "true");
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Logging in...");
      const response = await fetch(
        `https://localhost:7206/api/Korisnik/login?email=${email}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`${response.status}`);
      }
      
      const data = (await response.json()) as UserType;
      setUser(data);
      const isAdmin = data.uloga === "Admin";
      setIsAdmin(isAdmin);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
      setLoading(false);
    } catch (err) {
      throw new Error(`HTTP error! status: ${err}`);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    user && console.log("user: ", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
