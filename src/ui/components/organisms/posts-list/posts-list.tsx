import { PostType, Vote, type Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
    posts: Post[];
    isMine?: boolean;
    onClickOnPost: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnAvatar: (post: Post) => void;
    onClickDelete?: (postId: string) => void;
    onClickEdit?: (postId: string) => void;
    activeMenuId?: string | null;
    onToggleMenu?: (postId: string) => void;
    onCloseMenu?: () => void;
    postTypes: PostType[];
};

export default function PostsList({
    posts,
    isMine,
    onClickOnPost,
    onClickOnComments,
    handleVotePost,
    onClickOnAvatar,
    onClickDelete,
    onClickEdit,
    activeMenuId,
    onToggleMenu,
    onCloseMenu,
    postTypes
}: Props) {
  return (
    <section className={style.list}>
      {posts.map((post) => (
          <PostItem
              key={post.id}
              post={post}
              onUpVote={() => handleVotePost(post.id, Vote.UPVOTE)}
              onDownVote={() => handleVotePost(post.id, Vote.DOWNVOTE)}
              onClickOnComments={() => onClickOnComments(post.id)}
              onClickOnAvatar={() => onClickOnAvatar(post)}
              onClickDelete={() => onClickDelete(post.id)}
              onClickOnPost={() => onClickOnPost(post.id)}
              onClickEdit={() => onClickEdit(post.id)}
              isMine={isMine}
              isMenuOpen={activeMenuId === post.id}
              onToggleMenu={() => onToggleMenu(post.id)}
              onCloseMenu={onCloseMenu}
              postTypes={postTypes}
          />
      ))}
    </section>
  );
}
