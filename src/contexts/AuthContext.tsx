"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cart.store";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { clearCart } = useCartStore.getState();
  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    clearCart(); // <-- الخطوة السحرية: قم بتفريغ السلة عند تسجيل الخروج
    toast.success("Logout successful");
  }, [clearCart]);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        const decodedToken = jwtDecode<{ exp: number }>(storedToken);
        if (decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          toast.error("Your session has expired. Please log in again.");
        } else {
          setToken(storedToken);
        }
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    toast.success("Login successful");
  }, []);

  const value = { token, login, logout, isLoggedIn: !!token };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
