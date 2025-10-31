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
import { userAPI } from "../rest/UserAPI";
import { useNavigate } from "react-router";

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
  signin: (email: string, password: string) => Promise<unknown>;
  signout: () => void;
  onUnauthorized: (error: AxiosError) => void;
  signup: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const sessionToken = Cookies.get("session_token");
    if (sessionToken) {
      setToken(sessionToken);
      getUserData(sessionToken);
    }
  }, []);

  const signup = async (email: string, password: string) => {
    try {
      await userAPI.post("/auth/signup", {
        email,
        password,
        role: "Client",
      });
      navigate("/auth/login");
    } catch (error) {
      console.error("Failed to sign up", error);
    }
  };

  const signin = async (email: string, password: string) => {
    try {
      const tokenResponse = await userAPI.post("/auth/signin", {
        email,
        password,
      });

      const userToken = tokenResponse.data.token;

      Cookies.set("session_token", userToken, {
        expires: 1,
        sameSite: "strict",
      });
      await getUserData(userToken);
      setToken(userToken);
      navigate("/");
    } catch (error) {
      return error;
    }
  };

  const signout = () => {
    Cookies.remove("session_token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };
  const onUnauthorized = (error: AxiosError) => {
    if (error.response?.status === 401) {
      signout();
    }
  };
  const getUserData = async (token: string) => {
    try {
      const userDataResponse = await userAPI.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = userDataResponse.data;
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        signin,
        signup,
        signout,
        onUnauthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
