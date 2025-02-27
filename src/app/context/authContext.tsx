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
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    // Dummy data for login
    const dummyUser: UserType = {
      id: "1",
      email,
      firstName: "John",
      lastName: "Doe",
      zone: "A",
      role: email === "admin@example.com" ? "admin" : "worker",
    };
    setUser(dummyUser);
    if (dummyUser.role === "admin") {
      setIsAdmin(true);
    }
    return Promise.resolve();
  };

  useEffect(() => {
    console.log("AuthProvider mounted");
    return () => {
      console.log("AuthProvider unmounted");
    };
  }, []);

  const logout = () => {
    setUser(null);
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