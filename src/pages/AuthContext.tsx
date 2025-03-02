import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode"; // Ensure correct import

interface User {
  user_id: number;
  email: string;
  token: string;
  role?: string;
  exp?: number; // UNIX timestamp (seconds)
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return null;

      const parsedUser: User = JSON.parse(storedUser);
      const currentTime = Date.now() / 1000; // Convert to seconds

      if (parsedUser.exp && parsedUser.exp < currentTime) {
        console.warn("Stored token expired. Clearing session.");
        localStorage.removeItem("user");
        return null;
      }

      return parsedUser;
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return null;
    }
  });

  const login = useCallback((userData: User) => {
    try {
      if (!userData.token) {
        console.error("⚠️ No token provided in userData");
        return;
      }
  
      const decodedToken: any = jwtDecode(userData.token);
      if (!decodedToken.exp) {
        console.warn("⚠️ Token has no expiration date.");
        return;
      }
  
      const updatedUser: User = {
        ...userData,
        exp: decodedToken.exp,
        role: userData.role || "user",
      };
  
      setUser(updatedUser);
      localStorage.setItem("token", userData.token); // Ensure token is stored
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("❌ Error decoding token:", error);
    }
  }, []);
  

  // ✅ Logout function (clears session)
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.clear();
    console.info("User logged out successfully.");
  }, []);

  // ✅ Auto-logout when token expires
  useEffect(() => {
    if (!user?.exp) return;

    const expirationTime = user.exp * 1000;
    const currentTime = Date.now();

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
  }, [user, logout]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook to access auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
