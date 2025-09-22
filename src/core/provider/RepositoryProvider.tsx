import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { SesionRepository } from "../../infrastructure/repository/sesion";
import { AuthRepository } from "../../infrastructure/repository/auth";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sesionRepository: SesionRepository;
  authRepository: AuthRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
    sesionRepository: new SesionRepository(),
    authRepository: new AuthRepository(),
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
