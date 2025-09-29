import PostsList from "../../organisms/posts-list/posts-list"; 
import { Post } from "../../../../domain";

export default function PostPage() {
  const posts: Post[] = [
    new Post(
      "p1",
      "Primer post",
      "Contenido del post 1",
      120,
      "u1",
      10,
      2,
      { id: "c1", name: "General" },
      new Date(),
      new Date(),
      ""
    ),
    new Post(
      "p2",
      "Segundo post",
      "Contenido del post 2",
      80,
      "u1",
      5,
      1,
      { id: "c1", name: "General" },
      new Date(),
      new Date(),
      ""
    )
  ];

  return (
    <PostsList
      posts={posts}
      avatarName="Ana"
      avatarSurname="Druetta"
      avatarProfileImage=""
      onUpVote={(id) => console.log("Upvote", id)}
      onDownVote={(id) => console.log("Downvote", id)}
      onClickOnComments={(id) => console.log("Comment", id)}
      onAvatarClick={() => console.log("Avatar clicked")}
    />
  );
}

