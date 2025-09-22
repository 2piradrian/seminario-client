import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sesionRepository: SesionRepo
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
  }), []);

  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = () => {
  const context = useContext(RepositoriesContext);

  if (!context) {
    throw new Error("context error");
  }

  return context;
};
