import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  token: string;
  role?: string; // Optional to prevent errors
  exp?: string;  // Expiration time (added for auto-logout)
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  // Save user data to local storage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // ✅ Login function with default role assignment
  const login = (userData: User) => {
    const updatedUser = { ...userData, role: userData.role || "user" }; // Assign default role if missing
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // ✅ Logout function (clears storage & state)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.clear(); // Clear session storage
  };

  // ✅ Auto-logout when token expires
  useEffect(() => {
    if (user?.exp) {
      const expirationTime = new Date(user.exp).getTime();
      const currentTime = new Date().getTime();

      if (currentTime >= expirationTime) {
        console.warn("Session expired, logging out...");
        logout();
      } else {
        const timeout = expirationTime - currentTime;
        const logoutTimer = setTimeout(() => {
          console.warn("Session expired, logging out...");
          logout();
        }, timeout);

        return () => clearTimeout(logoutTimer);
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
