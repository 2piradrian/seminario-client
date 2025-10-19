import { Vote, type Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
    posts: Post[];
    isMine?: boolean;
    onClickOnPost: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnAvatar: (post: Post) => void;
};

export default function PostsList({
    posts,
    isMine,
    onClickOnPost,
    onClickOnComments,
    handleVotePost,
    onClickOnAvatar
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
              onClickOnPost={() => onClickOnPost(post.id)}
              isMine={isMine}
          />
      ))}
    </section>
  );
}
