import ProfileCard from "../../molecules/profile-card/profile-card";
import PostsList from "../posts-list/posts-list";
import type { PageProfile, Post, PostType, User, Vote } from "../../../../domain";
import CreateButton from "../../molecules/create-button/create-button";
import style from "./style.module.css";

type Props = {
    user: User;
    onProfileClick: (profileId: string) => void;
    posts: Post[];
    pages: PageProfile[];
    onClickOnPost: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnAvatar: (post: Post) => void;
    postTypes: PostType[];
};

export default function MainFeed({
    user,
    onProfileClick,    
    posts,
    onClickOnPost,
    onClickOnComments,
    handleVotePost,
    onClickOnAvatar,
    postTypes
}: Props) {

  return (
    <div className={style.container}>
      <div className={style.profileBlock}>
        <ProfileCard
          profile={user.profile}
          onClickOnAvatar={() => onProfileClick(user.id)}
        />
      </div>
      <div className={style.feed}>
          <PostsList
            onClickOnAvatar={onClickOnAvatar}
            onClickOnComments={onClickOnComments}
            handleVotePost={handleVotePost}
            posts={posts}
            onClickOnPost={onClickOnPost}
            postTypes={postTypes}
          />
      </div>
    </div>
  );
}
