import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { SesionRepository } from "../../infrastructure/repository/sesion";
import { UserRepository } from "../../infrastructure/repository/user";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sesionRepository: SesionRepository;
  userRepository: UserRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
    sesionRepository: new SesionRepository(),
    userRepository: new UserRepository(),
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
