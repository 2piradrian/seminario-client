import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { AuthRepository, CommentRepository, PageProfileRepository, PostRepository, CatalogRepository, UserRepository, SessionRepository, EventRepository, FollowRepository, ResultRepository, ReviewRepository } from "../../infrastructure";

interface RepositoriesProviderProps {
  children: ReactNode;
}

interface RepositoriesContextType {
  sessionRepository: SessionRepository;
  authRepository: AuthRepository;
  userRepository: UserRepository;
  catalogRepository: CatalogRepository;
  postRepository: PostRepository;
  commentRepository: CommentRepository;
  pageRepository: PageProfileRepository;
  resultRepository: ResultRepository;
  eventRepository: EventRepository;
  reviewRepository: ReviewRepository;
  followRepository: FollowRepository;
}

const RepositoriesContext = createContext<RepositoriesContextType | null>(null);

export const RepositoriesProvider = ({ children }: RepositoriesProviderProps) => {
  const repositories = useMemo(() => ({
    sessionRepository: new SessionRepository(),
    authRepository: new AuthRepository(),
    userRepository: new UserRepository(),
    catalogRepository: new CatalogRepository(),
    postRepository: new PostRepository(),
    commentRepository: new CommentRepository(),
    pageRepository: new PageProfileRepository(),
    resultRepository: new ResultRepository(),
    eventRepository: new EventRepository(),
    reviewRepository: new ReviewRepository()
    followRepository: new FollowRepository()
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