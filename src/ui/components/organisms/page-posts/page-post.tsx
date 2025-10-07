import PostsList from "../posts-list/posts-list";
import ProfileDetail from "../user-profile-detail/user-profile-detail";
import { Vote, type Post,  type UserProfile} from "../../../../domain";
import style from "./style.module.css"

type Props = {
    isMine: boolean
    posts: Post[];
    profile: UserProfile
    onClickOnComments: (postId: string) => void;
    onClickOnAvatar: () => void;
    onClickDelete: (postId : string) => void;
    onClickOnPost: (postId: string) => void;
    handleVotePost: (postId: string, voteType: Vote) => Promise<void>
};

export default function PagePosts ({    
    profile,
    posts,
    handleVotePost,
    onClickOnAvatar,
    onClickOnComments,
    onClickDelete,
    onClickOnPost, 
    isMine
} : Props) {

    return(
        <div className={style.container}>
            <div>
                <ProfileDetail 
                    profile={profile}   
                />
            </div>
            <div >
                <PostsList 
                    onClickOnAvatar={onClickOnAvatar}
                    onClickOnComments={onClickOnComments}
                    onClickDelete={onClickDelete}
                    handleVotePost={handleVotePost}
                    posts={posts}
                    onClickOnPost={onClickOnPost}
                    isMine={isMine}
                /> 
            </div>

        </div>
    
    );
}