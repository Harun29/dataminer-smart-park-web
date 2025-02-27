"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/authContext";
import LoginPage from "@/app/_login/page";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const {loading} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && window.location.pathname !== "/") {
      router.replace("/");
    } else if (user && window.location.pathname === "/login") {
      router.replace("/");
    }
  }, [user, router]);

  
  if (!user) {
    return <LoginPage />;
  }
  
  if (loading) {
    return null;
  }
  return (
    <div>
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
