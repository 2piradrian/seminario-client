import PostsList from "../posts-list/posts-list";
import EventList from "../event-list/event-list";
import UserProfileDetail from "../user-profile-detail/user-profile-detail";
import PageDetail from "../page-detail/page-detail";
import Modal from "../../molecules/modal/modal";
import TabNavigator from "../../../components/atoms/tab-navigator/tab-navigator";
import { type PageProfile, type Post, type UserProfile, type Vote, type Event, Review, ContentType } from "../../../../domain";
import style from "./style.module.css";
import ReviewList from "../review-list/review-list";
import CreateButton from "../../molecules/create-button/create-button";
import { Tabs } from "../../../../core";

type Props = {
  userProfile?: UserProfile;
  pageProfile?: PageProfile;
  activeTab: string;
  onTabClick: (tab: string) => void;
  posts: Post[];
  isMine: boolean;
  onProfileClick: (profileId: string) => void;
  onClickOnCreatePost: () => void;
  onClickOnCreateReview?: () => void;
  onClickOnCreateEvent: () => void;
  onClickOnPost: (postId: string) => void;
  onClickOnComments: (postId: string) => void;
  handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
  onClickOnAvatarPost: (post: Post) => void;
  onClickDeletePost?: (postId: string) => void;
  onClickEditPost?: (postId: string) => void;
  events: Event[];
  onClickOnEvent: (eventId: string) => void;
  onClickOnAvatarEvent: (event: Event) => void;
  onClickDeleteEvent?: (eventId: string) => void;
  onClickEditEvent?: (eventId: string) => void;
  reviews: Review[];
  onClickOnAvatarReview?: (reviewId: Review) => void;
  onClickDeleteReview?: (reviewId: string) => void;
  isDeleteOpen: boolean;
  cancelDelete: () => void;
  proceedDelete: () => void;
  onClickOnMember?: (profileId: string) => void;
  currentUserId?: string;
  activeMenuId?: string | null;
  onToggleMenu?: (postId: string) => void;
  onCloseMenu?: () => void;
};

export default function ProfileFeed({
  userProfile,
  pageProfile,
  activeTab,
  onTabClick,
  posts,
  isMine,
  onProfileClick,
  onClickOnCreatePost,
  onClickOnCreateReview,
  onClickOnCreateEvent,
  onClickOnPost,
  onClickOnComments,
  handleVotePost,
  onClickOnAvatarPost,
  onClickDeletePost,
  events,
  onClickOnEvent,
  onClickOnAvatarEvent,
  onClickDeleteEvent,
  reviews,
  onClickOnAvatarReview,
  onClickDeleteReview,
  isDeleteOpen,
  cancelDelete,
  proceedDelete,
  onClickOnMember,
  onClickEditPost,
  onClickEditEvent,
  currentUserId,
  activeMenuId,
  onToggleMenu,
  onCloseMenu
}: Props) {

  return (
    <div className={style.container}>

      {userProfile ? (
        <UserProfileDetail profile={userProfile} />
      ) : (
        pageProfile && <PageDetail page={pageProfile} onClickOnMember={onClickOnMember} />
      )}

      <div className={style.feedContainer}>
        <TabNavigator
          tabs={Tabs.content}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />

        {activeTab === ContentType.POSTS && (
            <>
              {isMine && userProfile && (
                <CreateButton
                  onClickOnAvatar={() => onProfileClick(userProfile.id)}
                  onClickOnCreate={onClickOnCreatePost}
                  profile={userProfile.toProfile()}
                  text="Crear nueva publicación"
                />
              )}
              <PostsList
                posts={posts}
                isMine={isMine}
                onClickOnPost={onClickOnPost}
                onClickOnComments={onClickOnComments}
                handleVotePost={handleVotePost}
                onClickOnAvatar={onClickOnAvatarPost}
                onClickDelete={onClickDeletePost}
                onClickEdit={onClickEditPost}
                activeMenuId={activeMenuId}
                onToggleMenu={onToggleMenu}
                onCloseMenu={onCloseMenu}
              />
          </>
        )}

        {activeTab === ContentType.EVENTS && (
          <>
            {isMine && userProfile && (
              <CreateButton
              	onClickOnAvatar={() => onProfileClick(userProfile.id)}
              	onClickOnCreate={onClickOnCreateEvent}
              	profile={userProfile.toProfile()}
              	text="Crear nuevo evento"
              />
            )}
            <EventList
              events={events}
              isMine={isMine}
              onClickOnEvent={onClickOnEvent}
              onClickOnAvatar={onClickOnAvatarEvent}
              onClickDelete={onClickDeleteEvent}
              onClickEdit={onClickEditEvent}
            />
          </>
        )}
        {activeTab === ContentType.REVIEWS && (
          <>
            {!isMine && userProfile && (
              <CreateButton
                onClickOnAvatar={() => onProfileClick(userProfile.id)}
                onClickOnCreate={onClickOnCreateReview}
                profile={userProfile.toProfile()}
                text="Crear nueva reseña"
              />
            )}
            <ReviewList
              reviews={reviews}
              isMine={isMine}
              currentUserId={currentUserId}
              onClickOnAvatar={onClickOnAvatarReview}
              onClickDelete={onClickDeleteReview}
            />
          </>
        )}
      </div>

      {isDeleteOpen && (
        <Modal
          title={`¿Estas seguro de eliminar est${activeTab === ContentType.POSTS ? "e post" : activeTab === ContentType.EVENTS ? "e evento" : "a reseña"}?`}
          description="Esta acción no se puede deshacer"
          cancelText="Cancelar"
          deleteText="Eliminar"
          onCancel={cancelDelete}
          onProceed={proceedDelete}
        />
      )}
      
    </div>
  )
}
