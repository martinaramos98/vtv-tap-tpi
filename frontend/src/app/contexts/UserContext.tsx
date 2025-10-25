// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import type { AxiosError } from "axios";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: "Administrator" | "Client";
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
  onUnauthorized: (error: AxiosError) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const sessionToken = Cookies.get("session_token");
    if (sessionToken) {
      setToken(sessionToken);
      // mock user from token validation
      setUser({
        id: "mock-user-id",
        fullName: "John Doe",
        email: "john@example.com",
        role: "Client",
      });
    }
  }, []);

  const signin = async (email: string, password: string) => {
    // mock API call
    const mockResponse = {
      token: "mock-jwt-token",
      user: {
        id: "mock-user-id",
        fullName: "John Doe",
        email,
        role: "Administrator" as const,
      },
    };

    Cookies.set("session_token", mockResponse.token, {
      expires: 1,
      sameSite: "strict",
    });
    setToken(mockResponse.token);
    setUser(mockResponse.user);
  };

  const signout = () => {
    Cookies.remove("session_token");
    setUser(null);
    setToken(null);
    window.location.href = "/login";
  };
  const onUnauthorized = (error: AxiosError) => {
    if (error.response?.status === 401) {
      signout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        signin,
        signout,
        onUnauthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
