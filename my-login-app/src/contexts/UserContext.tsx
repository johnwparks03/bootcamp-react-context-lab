import { createContext, useContext, type ReactNode } from "react";
import type { User } from "../shared.types";

type UserContextType = {
  user: User | null;
  handleLogout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
  user: User | null;
  handleLogout: () => void;
};

export function UserProvider({
  children,
  user,
  handleLogout,
}: UserProviderProps) {
  return (
    <UserContext.Provider value={{ user, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
