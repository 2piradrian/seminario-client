import style from "./style.module.css";
import ProfileCard from "../../molecules/profile-card/profile-card";
import PostsList from "../posts-list/posts-list";
import { Profile } from "../../../../domain";
import type { Post, UserProfile, Vote } from "../../../../domain";
import CreatePostFeed from "../../molecules/create-post-feed/create-post-feed";

type Props = {
    activeProfile: UserProfile;
    onProfileClick: (profileId: string) => void;
    posts: Post[];
    onClickOnPost: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnAvatar: (post: Post) => void;
    onClickOnCreatePost: () => void;
};

export default function MainFeed({
    activeProfile,
    onProfileClick,    
    posts,
    onClickOnPost,
    onClickOnComments,
    handleVotePost,
    onClickOnAvatar,
    onClickOnCreatePost
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
          <div className={style.createPostWrapper}>
            <CreatePostFeed
              profile={activeProfile.toProfile()}
              onClickOnAvatar={() => onProfileClick(activeProfile.id)}
              onClickOnCreatePost={() => onClickOnCreatePost()}
            />
          </div>

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
