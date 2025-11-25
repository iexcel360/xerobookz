"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email?: string;
  name?: string;
  id?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuth: (auth: { token: string; user: User }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("xerobookz_token");
    const storedUser = localStorage.getItem("xerobookz_user");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const setAuth = ({ token, user }: { token: string; user: User }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("xerobookz_token", token);
    localStorage.setItem("xerobookz_user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("xerobookz_token");
    localStorage.removeItem("xerobookz_refresh_token");
    localStorage.removeItem("xerobookz_user");
    localStorage.removeItem("xerobookz_tenant_id");
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        user,
        token,
        setAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

