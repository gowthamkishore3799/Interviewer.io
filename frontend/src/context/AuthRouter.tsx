// context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { getUserDetails, setUserDetails } from "../components/sessionStorage";
import type { AuthContextType } from "../interface/context.type";
import type { User } from "../interface/user.types";




const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const loggedInUser = getUserDetails()

  const [user, setUser] = useState<User | null>(loggedInUser);

  const login = (user: User) => {
    setUser(user)
    setUserDetails(user)
  }

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
