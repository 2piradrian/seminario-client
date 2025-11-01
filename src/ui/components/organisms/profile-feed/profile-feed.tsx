import PostsList from "../posts-list/posts-list";
import EventList from "../event-list/event-list";
import UserProfileDetail from "../user-profile-detail/user-profile-detail";
import PageDetail from "../page-detail/page-detail";
import Modal from "../../molecules/modal/modal";
import TabNavigator from "../../../components/atoms/tab-navigator/tab-navigator";
import type { PageProfile, Post, UserProfile, Vote, Event } from "../../../../domain";
import style from "./style.module.css";

type Props = {
  userProfile?: UserProfile;
  pageProfile?: PageProfile;
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  posts: Post[];
  isMine: boolean;
  onClickOnPost: (postId: string) => void;
  onClickOnComments: (postId: string) => void;
  handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
  onClickOnAvatarPost: (post: Post) => void;
  onClickDeletePost?: (postId: string) => void;
  onClickEdit?: (postId: string) => void;
  events: Event[];
  onClickOnEvent: (eventId: string) => void;
  onClickOnAvatarEvent: (event: Event) => void;
  onClickDeleteEvent?: (eventId: string) => void;
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
  onClickOnPost,
  onClickOnComments,
  handleVotePost,
  onClickOnAvatarPost,
  onClickDeletePost,
  events,
  onClickOnEvent,
  onClickOnAvatarEvent,
  onClickDeleteEvent,
  isDeleteOpen,
  cancelDelete,
  proceedDelete,
  onClickOnMember,
  onClickEdit
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
          <PostsList
            posts={posts}
            isMine={isMine}
            onClickOnPost={onClickOnPost}
            onClickOnComments={onClickOnComments}
            handleVotePost={handleVotePost}
            onClickOnAvatar={onClickOnAvatarPost}
            onClickDelete={onClickDeletePost}
            onClickEdit={onClickEdit}
          />
        )}

        {activeTab === "Eventos" && (
          <EventList
            events={events}
            isMine={isMine}
            onClickOnEvent={onClickOnEvent}
            onClickOnAvatar={onClickOnAvatarEvent}
            onClickDelete={onClickDeleteEvent}
          />
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
