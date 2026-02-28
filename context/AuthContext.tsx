"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { AxiosResponse } from "axios";
import { useAuthStore } from "../store/authStore";
import axios from "../lib/axios";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ProcessModal from "@/components/reusables/ProcessModal";

// --- Data Interfaces ---
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// --- Parameter Interfaces ---
interface SignupParams {
  plan_uid: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

interface ResetPasswordParams {
  otp: string;
  email: string;
  password: string;
  password_confirmation: string;
}

// --- API Response Interfaces ---
interface ApiResponse<T = undefined> {
  status: string;
  message?: string;
  data?: T;
}

interface LoginData {
  user: User;
  token: string;
}

interface SignupData {
  authorization_url?: string;
  access_code?: string;
  reference?: string;
}

// --- Context Interface ---
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<AxiosResponse<ApiResponse<LoginData>>>;
  logout: () => Promise<void>;
  signup: (
    data: SignupParams,
  ) => Promise<AxiosResponse<ApiResponse<SignupData>>>;
  // UPDATED: Now requires a reference string
  verifySubscription: (
    reference: string,
  ) => Promise<AxiosResponse<ApiResponse>>;
  forgotPassword: (email: string) => Promise<AxiosResponse<ApiResponse>>;
  resetPassword: (
    data: ResetPasswordParams,
  ) => Promise<AxiosResponse<ApiResponse>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define routes that ANYONE can visit
const PUBLIC_ROUTES = ["/login", "/register", "/subscribe", "/forgot-password"];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated, setUser, clearUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 1. Handle Hydration & Route Protection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoggingOut) return;

    const isPublicRoute = PUBLIC_ROUTES.some((route) =>
      pathname.startsWith(route),
    );

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }

    if (isAuthenticated && pathname === "/login") {
      router.push("/");
    }
  }, [isAuthenticated, pathname, router, isMounted, isLoggingOut]);

  // LOGIN
  const login = async (email: string, password: string) => {
    const res = await axios.post<ApiResponse<LoginData>>(
      "/api/talent/auth/login",
      { email, password },
    );

    if (res.data.status === "success" && res.data.data) {
      setUser(res.data.data.user, res.data.data.token);
    }
    return res;
  };

  // LOGOUT
  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post<ApiResponse>("/api/talent/auth/logout");
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      clearUser();
      // Added a small timeout to ensure the user sees the modal before redirect
      setTimeout(() => {
        setIsLoggingOut(false);
        router.push("/login");
      }, 1000);
    }
  };

  // SIGNUP
  const signup = async (data: SignupParams) => {
    const res = await axios.post<ApiResponse<SignupData>>(
      "/api/talent/register/subscription",
      data,
    );
    return res;
  };

  // VERIFY SUBSCRIPTION (Updated)
  const verifySubscription = async (reference: string) => {
    // Used 'params' to send it as ?reference=...
    const res = await axios.get<ApiResponse>(
      "/api/talent/register/subscription/verify",
      {
        params: { reference },
      },
    );
    return res;
  };

  // FORGOT PASSWORD
  const forgotPassword = async (email: string) => {
    const res = await axios.post<ApiResponse>("/api/talent/password/forgot", {
      email,
    });
    return res;
  };

  // RESET PASSWORD
  const resetPassword = async (data: ResetPasswordParams) => {
    const res = await axios.post<ApiResponse>(
      "/api/talent/password/reset",
      data,
    );
    return res;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading: !isMounted,
        login,
        logout,
        signup,
        verifySubscription,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}

      <Dialog open={isLoggingOut}>
        <DialogContent 
          className="sm:max-w-md p-0 overflow-hidden border-none" 
          showCloseButton={false}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="p-10 bg-white">
            <ProcessModal 
              title="Logging out..."
              description="Please wait while we safely sign you out."
            />
          </div>
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};
