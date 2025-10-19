import style from "./style.module.css"
import ProfileCard from "../../molecules/profile-card/profile-card";
import PostsList from "../posts-list/posts-list";
import type { Post, UserProfile, Vote } from "../../../../domain";


type Props = {
  activeProfile: UserProfile;
  posts: Post[]
  onProfileClick: (profileId: string) => void;
  onClickOnAvatar: (post: Post) => void;
  onClickOnComments: (postId: string) => void;
  onClickOnPost: (postId: string) => void; 
  handleVotePost: (postId: string, voteType: Vote) => Promise<void>
};

export default function MainFeed({
  posts, handleVotePost, onClickOnComments, onClickOnAvatar,
  activeProfile, onProfileClick, onClickOnPost,
}: Props) {
  return (
    <div className={style.container}>
      <div className={style.profileBlock}>
      <ProfileCard
        profile={activeProfile}
        onClickOnAvatar={() => onProfileClick(activeProfile.id)}
      />
      </div>
      <div className={style.postsWrap}>
        <div className={style.feed}>
          <PostsList
            onClickOnAvatar={onClickOnAvatar}
            onClickOnComments={onClickOnComments}
            handleVotePost={handleVotePost}
            posts={posts}
            onClickOnPost={onClickOnPost}
          />
        </div>
      </div>
    </div>
  );
}
