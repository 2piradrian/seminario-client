import { PostDatasourceI, type Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
    posts: Post[];
    onUpVote: (postId: string) => void;
    onDownVote: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    onClickOnAvatar: () => void;
    onClickDelete: (postId: string) => void;
    onClickOnPost: (postId: string) => void; 
    isMine: boolean
};

export default function PostsList({
  	posts, onUpVote, onDownVote, 
  	onClickOnComments, onClickOnAvatar, onClickDelete, onClickOnPost, isMine
}: Props) {
  return (
    <section className={style.list}>
      {posts.map((post) => (
          <PostItem
              key={post.id}
              post={post}
              onUpVote={() => onUpVote(post.id)}
              onDownVote={() => onDownVote(post.id)}
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
