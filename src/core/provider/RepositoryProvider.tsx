import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { SesionRepository } from "../../infrastructure/repository/sesion";
import { AuthRepository } from "../../infrastructure/repository/auth";
import { UserProfileRepository } from "../../infrastructure/repository/user-profile";
import { CatalogRepository } from "../../infrastructure/repository/catalog";
import { CommentRepository, PageProfileRepository, PostRepository } from "../../infrastructure";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sesionRepository: SesionRepository;
  authRepository: AuthRepository;
  userProfileRepository: UserProfileRepository;
  catalogRepository: CatalogRepository;
  postRepository: PostRepository;
  commentRepository: CommentRepository;
  pageRepository: PageProfileRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
    sesionRepository: new SesionRepository(),
    authRepository: new AuthRepository(),
    userProfileRepository: new UserProfileRepository(),
    catalogRepository: new CatalogRepository(),
    postRepository: new PostRepository(),
    commentRepository: new CommentRepository(),
    pageRepository: new PageProfileRepository(),
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