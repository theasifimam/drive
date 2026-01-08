"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AuthScreen from "@/components/AuthScreen";
import DrivePage from "../DrivePage";

export default function FolderPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
  };

  if (!isAuthenticated) {
    return (
      <AuthScreen
        onAuth={(userData) => {
          setIsAuthenticated(true);
          setUser(userData);
        }}
      />
    );
  }

  return (
    <DrivePage user={user} onLogout={handleLogout} folderId={params.folderId} />
  );
}
