import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  const login = async (username: string, password: string) => {
    // In a real app, this would be an API call
    // This is a mock implementation
    if (password.length < 6) {
      toast.error("Invalid credentials");
      return false;
    }

    // Mock successful login
    const newUser = {
      id: `user_${Date.now()}`,
      username,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success(`Welcome, ${username}!`);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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