import PostsList from "../posts-list/posts-list";
import EventList from "../event-list/event-list";
import UserProfileDetail from "../user-profile-detail/user-profile-detail";
import PageDetail from "../page-detail/page-detail";
import Modal from "../../molecules/modal/modal";
import TabNavigator from "../../../components/atoms/tab-navigator/tab-navigator";
import { type PageProfile, type Post, type UserProfile, type Vote, type Event, Profile, Review } from "../../../../domain";
import style from "./style.module.css";
import CreateButton from "../../molecules/create-button/create-button";
import ReviewList from "../review-list/review-list";

type Props = {
  userProfile?: UserProfile;
  pageProfile?: PageProfile;
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  isMine: boolean;
  onClickOnOwnAvatar: () => void;
  
  onClickOnCreatePost: () => void;
  onClickOnCreateEvent: () => void;
  onClickOnCreateReview: () => void;
  
  posts: Post[];
  onClickOnPost: (postId: string) => void;
  onClickOnComments: (postId: string) => void;
  handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
  onClickOnAvatarPost: (item: Post) => void; 
  onClickDeletePost?: (postId: string) => void;
  onClickEditPost?: (postId: string) => void;
  
  events: Event[];
  onClickOnEvent: (eventId: string) => void;
  onClickOnAvatarEvent: (event: Event) => void;
  onClickDeleteEvent?: (eventId: string) => void; 
  onClickEditEvent?: (eventId: string) => void; 
  
  reviews: Review[];
  onClickOnReview:(reviewId: string) =>void;
  onClickOnAvatarReview: (review: Review) => void;
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
  onClickOnOwnAvatar,
  onClickOnCreatePost,
  onClickOnCreateEvent,
  onClickOnCreateReview,
  onClickOnPost,
  onClickOnComments,
  handleVotePost,
  onClickOnAvatarPost,
  onClickDeletePost,
  onClickEditPost,
  events,
  onClickOnEvent,
  onClickOnAvatarEvent,
  onClickDeleteEvent,
  onClickEditEvent,
  reviews,
  onClickOnAvatarReview,
  onClickOnReview,
  onClickDeleteReview,
  onClickEditReview,
  isDeleteOpen,
  cancelDelete,
  proceedDelete,
  onClickOnMember,
}: Props) {

  const authorProfile = Profile.fromEntity(userProfile, pageProfile);

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
                  onClickOnAvatar={onClickOnOwnAvatar}
                  onClickOnCreate={onClickOnCreatePost}
                  profile={authorProfile}
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
            {isMine && (
              <CreateButton
                onClickOnAvatar={onClickOnOwnAvatar}
                onClickOnCreate={onClickOnCreateEvent}
                profile={authorProfile}
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
        {activeTab === "Reseña" && (
          <>
            {isMine && (
              <CreateButton
                  onClickOnAvatar={onClickOnOwnAvatar}
                  onClickOnCreate={onClickOnCreateReview}
                  profile={authorProfile}
                  text="Crear nueva reseña"
              />
            )}
            <ReviewList
              reviews={reviews}
              isMine={isMine}
              onClickOnReview={onClickOnReview}
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
