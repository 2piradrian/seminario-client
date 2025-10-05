import type { Post } from "../../../../domain";
import PostItem from "../../molecules/post-item/post-item";
import style from "./style.module.css";

type Props = {
    posts: Post[];
    onUpVote: (postId: string) => void;
    onDownVote: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    onClickOnAvatar: () => void;
    onClickDelete: () => void;
};

export default function PostsList({
  	posts, onUpVote, onDownVote, 
  	onClickOnComments, onClickOnAvatar, onClickDelete
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
              onClickDelete={onClickDelete}
          />
      ))}
    </section>
  );
}
