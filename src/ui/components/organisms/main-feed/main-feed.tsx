import style from "./style.module.css";
import ProfileCard from "../../molecules/profile-card/profile-card";
import PostsList from "../posts-list/posts-list";
import { Profile } from "../../../../domain";
import type { Post, UserProfile, Vote } from "../../../../domain";
import CreateButton from "../../molecules/create-button/create-button";

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
            <CreateButton
              profile={Profile.fromEntity(activeProfile, undefined)}
              onClickOnAvatar={() => onProfileClick(activeProfile.id)}
              onClickOnCreate={() => onClickOnCreatePost()}
              text="Crear nueva publicación"
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
