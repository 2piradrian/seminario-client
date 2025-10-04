import style from "./style.module.css"
import { type Post,  type UserProfile} from "../../../../domain";
import PostsList from "../posts-list/posts-list";
import ProfileDetail from "../user-profile-detail/user-profile-detail";

type Props = {
    profile: UserProfile
    posts: Post[];
    onUpVote: (postId: string) => void;
    onDownVote: (postId: string) => void;
    onClickOnComments: (postId: string) => void;
    onClickOnAvatar: () => void;
};

export default function PagePosts ({    
    profile,
    posts,
    onClickOnAvatar,
    onClickOnComments,
    onDownVote,
    onUpVote} : Props) {

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
                    onDownVote={onDownVote}
                    onUpVote={onUpVote}
                    posts={posts}
                /> 
            </div>

        </div>
    
    );
}