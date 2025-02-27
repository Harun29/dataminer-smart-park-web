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
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.role === "admin");
      setLoading(false);     
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    const dummyUser: UserType = {
      id: "1",
      email,
      firstName: "John",
      lastName: "Doe",
      zone: "A",
      role: email === "admin@example.com" ? "admin" : "worker",
    };
    
    localStorage.setItem("user", JSON.stringify(dummyUser));
    setUser(dummyUser);
    setIsAdmin(dummyUser.role === "admin");
    setLoading(false);     
  };
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAdmin(false);
  };
  
  

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