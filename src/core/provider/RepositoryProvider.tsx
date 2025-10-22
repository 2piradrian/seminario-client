import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { AuthRepository, CommentRepository, PageProfileRepository, PostRepository, CatalogRepository, UserProfileRepository, SessionRepository } from "../../infrastructure";
import { ResultRepository } from "../../infrastructure/repository/result";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sessionRepository: SessionRepository;
  authRepository: AuthRepository;
  userProfileRepository: UserProfileRepository;
  catalogRepository: CatalogRepository;
  postRepository: PostRepository;
  commentRepository: CommentRepository;
  pageRepository: PageProfileRepository;
  resultRepository: ResultRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
    sessionRepository: new SessionRepository(),
    authRepository: new AuthRepository(),
    userProfileRepository: new UserProfileRepository(),
    catalogRepository: new CatalogRepository(),
    postRepository: new PostRepository(),
    commentRepository: new CommentRepository(),
    pageRepository: new PageProfileRepository(),
    resultRepository: new ResultRepository(),
  }), []);

  return (
    <RepositoriesContext.Provider value={repositories}>
      {children}
    </RepositoriesContext.Provider>
  );
};

export const useRepositories = () => {
  const context = useContext(RepositoriesContext);
  if (!context) throw new Error("context error");

  return context;
};