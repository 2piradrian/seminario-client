import PostsList from "../posts-list/posts-list";
import EventList from "../event-list/event-list";
import UserProfileDetail from "../user-profile-detail/user-profile-detail";
import PageDetail from "../page-detail/page-detail";
import Modal from "../../molecules/modal/modal";
import TabNavigator from "../../../components/atoms/tab-navigator/tab-navigator";
import { type PageProfile, type Post, type UserProfile, type Vote, type Event, Review } from "../../../../domain";
import style from "./style.module.css";
import ReviewList from "../review-list/review-list";
import CreateButton from "../../molecules/create-button/create-button";

type Props = {
  userProfile?: UserProfile;
  pageProfile?: PageProfile;
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  posts: Post[];
  isMine: boolean;
  onProfileClick: (profileId: string) => void;
  onClickOnCreatePost: () => void;
  onClickOnCreateReview: () => void;
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
  onClickOnAvatarReview: (reviewId: Review) => void;
  onClickDeleteReview?: (reviewId: string) => void;
  onClickEditReview?: (reviewId: string) => void;
  isDeleteOpen: boolean;
  cancelDelete: () => void;
  proceedDelete: () => void;
  onClickOnMember?: (profileId: string) => void;
};

export default function ProfileFeed({
  userProfile,
  pageProfile,
  tabs,
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
  onClickEditReview
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
          tabs={tabs}
          activeTab={activeTab}
          onTabClick={onTabClick}
        />

        {activeTab === "Posts" && (
            <>
              {isMine && (
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
              />
          </>
        )}

        {activeTab === "Eventos" && (
          <>
            <CreateButton
              onClickOnAvatar={() => onProfileClick(userProfile.id)}
              onClickOnCreate={onClickOnCreateEvent}
              profile={userProfile.toProfile()}
              text="Crear nuevo Evento"
              />
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
        {activeTab === "Reseñas" && (
          <>
            {isMine && (
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
              onClickOnAvatar={onClickOnAvatarReview}
              onClickDelete={onClickDeleteReview}
              onClickEdit={onClickEditReview}
            />
          </>
        )}
      </div>

      {isDeleteOpen && (
        <Modal
          title={`¿Estas seguro de eliminar este ${activeTab === "Posts" ? "post" : "evento"}?`}
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
