import Loading from "../../atoms/loading/loading";
import NoResults from "../../atoms/no-results/no-results";
import PostsList from "../posts-list/posts-list";
import ProfileList from "../profile-list/profile-list";
import type { Post, Vote, User, PageProfile } from "../../../../domain";
import style from "./style.module.css"

type Props = {
    loading: boolean;
    selectedContentType: string;
    posts: Post[];
    users: User[];
    pages: PageProfile[];
    userId?: string;
    searchAttempted: boolean;
    hasResults: boolean;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>;
    onClickOnComments: (postId: string) => void;
    onClickOnAvatar: (post: Post) => void;
    onClickDelete: (postId: string) => void;
    onClickOnPost: (postId: string) => void;
    onClickOnProfile: (profile) => void;
    toggleFollow: (profile) => void;
};

export default function SearchResults({
    loading,
    selectedContentType,
    posts,
    users,
    pages,
    userId,
    searchAttempted,
    hasResults,
    handleVotePost,
    onClickOnComments,
    onClickOnAvatar,
    onClickDelete,
    onClickOnPost,
    onClickOnProfile,
    toggleFollow
}: Props) {

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={style.container}>
            {selectedContentType === "Posts" && posts.length > 0 && ( <PostsList
                   posts={posts}
                   handleVotePost={handleVotePost}
                   onClickOnComments={onClickOnComments}
                   onClickOnAvatar={onClickOnAvatar}
                   onClickDelete={onClickDelete}
                   onClickOnPost={onClickOnPost}
                 />
            )}

              {selectedContentType === "Usuarios" && users.length > 0 && (
                <ProfileList
                  profiles={users.map((user) => user.toProfile())}
                  toggleFollow={toggleFollow}
                  onClickOnProfile={onClickOnProfile}
                  showDescription={true}
                  currentUserId={userId}
                />
              )}

              {selectedContentType === "Páginas" && pages.length > 0 && (
                <ProfileList
                  profiles={pages.map((page) => page.toProfile())}
                  toggleFollow={toggleFollow}
                  onClickOnProfile={onClickOnProfile}
                />
              )}

              {searchAttempted && !hasResults && <NoResults />}
        </div>
    );
}
