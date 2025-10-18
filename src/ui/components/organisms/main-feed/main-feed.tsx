import { Post, Vote, type UserProfile } from "../../../../domain";
import style from "./style.module.css";
import ProfileCard from "../../molecules/profile-card/profile-card";
import PostsList from "../posts-list/posts-list";

type Props = {
  activeProfile: UserProfile;
  posts: Post[]
  isMine: boolean
  onProfileClick: (profileId: string) => void;
  onClickOnAvatar: () => void;
  onClickOnComments: (postId: string) => void;
  onClickOnPost: (postId: string) => void; 
  handleVotePost: (postId: string, voteType: Vote) => Promise<void>
};

export default function MainFeed({
  posts, 
  handleVotePost, 
  onClickOnComments, 
  onClickOnAvatar, 
  activeProfile,
  onProfileClick,
  onClickOnPost,
  isMine
}:Props) {
  return (
    <div className={style.container}>
      <ProfileCard
        profile={activeProfile}
        onClickOnAvatar={() => onProfileClick(activeProfile.id)}
      />
      <PostsList 
          onClickOnAvatar={onClickOnAvatar}
          onClickOnComments={onClickOnComments}
          handleVotePost={handleVotePost}
          posts={posts}
          onClickOnPost={onClickOnPost}
          isMine={isMine}
        /> 
    </div>
  );
}
