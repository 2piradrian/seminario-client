import type { ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { AuthRepository, ResultRepository, CommentRepository, PageProfileRepository, PostRepository, CatalogRepository, SessionRepository, EventRepository, ReviewRepository, UserRepository, FollowRepository, NotificationRepository, ChatRepository, BannedUserRepository, PostTypeRepository, PageTypeRepository, InstrumentRepository, StyleRepository, ModerationReasonRepository } from "../../infrastructure";

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
  notificationRepository: NotificationRepository;
  chatRepository: ChatRepository;
  bannedUserRepository: BannedUserRepository;
  postTypeRepository: PostTypeRepository;
  pageTypeRepository: PageTypeRepository;
  instrumentRepository: InstrumentRepository;
  styleRepository: StyleRepository;
  moderationReasonRepository: ModerationReasonRepository;
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
    reviewRepository: new ReviewRepository(),
    followRepository: new FollowRepository(),
    notificationRepository: new NotificationRepository(),
    chatRepository: new ChatRepository(),
    bannedUserRepository: new BannedUserRepository(),
    postTypeRepository: new PostTypeRepository(),
    pageTypeRepository: new PageTypeRepository(),
    instrumentRepository: new InstrumentRepository(),
    styleRepository: new StyleRepository(),
    moderationReasonRepository: new ModerationReasonRepository()
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
