import { Vote, type Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
  	posts: Post[];
  	isMine: boolean
	  onClickOnAvatar: () => void;
    onClickOnComments: (postId: string) => void;
    onClickDelete: (postId: string) => void;
    onClickOnPost: (postId: string) => void; 
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>
};

export default function PostsList({
  	posts, 
	  handleVotePost, 
  	onClickOnComments, 
    onClickOnAvatar, 
    onClickDelete, 
    onClickOnPost, 
    isMine
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
              onClickOnAvatar={onClickOnAvatar}
              onClickDelete={() => onClickDelete(post.id)}
              onClickOnPost={() => onClickOnPost(post.id)}
              isMine={isMine}
          />
      ))}
    </section>
  );
}
