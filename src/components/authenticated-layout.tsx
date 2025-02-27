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

  if (loading) {
    return null;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default AuthenticatedLayout;
