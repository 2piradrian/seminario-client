import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { SesionRepository } from "../../infrastructure/repository/sesion";
import { AuthRepository } from "../../infrastructure/repository/auth";
import { UserProfileRepository } from "../../infrastructure/repository/user-profile";
import { CatalogRepository } from "../../infrastructure/repository/catalog";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sesionRepository: SesionRepository;
  authRepository: AuthRepository;
  userProfileRepository: UserProfileRepository;
  catalogRepository: CatalogRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
    sesionRepository: new SesionRepository(),
    authRepository: new AuthRepository(),
    userProfileRepository: new UserProfileRepository(),
    catalogRepository: new CatalogRepository(),
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
