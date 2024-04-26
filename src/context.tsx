import { createContext, useContext, useState } from "react";
import { AppState } from "./types";

export const AppContext = createContext<AppState>({
  isAdmin: false,
  setIsAdmin: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const contextValue: AppState = {
    isAdmin,
    setIsAdmin,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
