import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const hasCheckedRef = useRef(false);
  const isCheckingRef = useRef(false);

  const checkAuth = async () => {
    // Prevent multiple simultaneous checks
    if (isCheckingRef.current) {
      return;
    }

    isCheckingRef.current = true;
    setLoading(true);

    try {
      const response = await authService.getProfile();
      if (response.success && response.user) {
        setUser(response.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      // User is not authenticated or connection error
      // Silently fail - don't show errors for auth checks
      // 401 is expected when user is not logged in, so we suppress it
      if (error.response?.status !== 401) {
        // Only log non-401 errors (like network errors)
        console.error("Auth check error:", error);
      }
      setUser(null);
    } finally {
      setLoading(false);
      isCheckingRef.current = false;
    }
  };

  // Check if user is authenticated on mount (only once, even in StrictMode)
  useEffect(() => {
    // Only check once on initial mount - use ref to persist across StrictMode double renders
    if (!hasCheckedRef.current) {
      hasCheckedRef.current = true;
      checkAuth();
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || "Login failed" };
    } catch (error) {
      console.error("Login error details:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials and try again.";
      return { success: false, message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      if (response.success && response.user) {
        setUser(response.user);
        return { success: true, message: response.message };
      }
      return {
        success: false,
        message: response.message || "Registration failed",
      };
    } catch (error) {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Continue even if logout fails on server
    } finally {
      setUser(null);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
