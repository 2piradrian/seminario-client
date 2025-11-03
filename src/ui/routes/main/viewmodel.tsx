import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Post, User, Vote, type GetUserByIdReq, type TogglePostVotesReq } from "../../../domain";
import type { GetFeedPostPageReq } from "../../../domain/dto/result/request/GetFeedPageReq";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository } = useRepositories();

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchProfile();
                await fetchPosts();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            setPostPage(trigger);
            fetchPosts().then();
        }
    }, [trigger]);

    const fetchPosts = async () => {
        try {
            const postsRes = await resultRepository.getFeedPost(
                { page: postPage, size: 15, session: session } as GetFeedPostPageReq);
            
            if (!postsRes.posts || postsRes.posts.length === 0) {
                setCanScroll(false);
                if (postPage === 1) setPosts([]);
                return;
            }

            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            } 
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts.map(Post.fromObject)
                ]);
            }
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchProfile = async () => {
        try {
            const userResponse = await userRepository.getUserById({
                session: session, userId
            } as GetUserByIdReq);

            const userEntity = User.fromObject(userResponse);
            setUser(userEntity);

            if (userEntity) {
                setUser(userEntity);
            }
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatar = (post : Post) => {
        if (post.author?.id && !post.pageProfile?.id){
            navigate(`/user/${post.author.id}`);
        }
        else if (post.pageProfile?.id){
            navigate(`/page/${post.pageProfile.id}`);
        }     
    }

    const onClickOnComments = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnPost = (postId: string) => {
        navigate(`/post-detail/${postId}`);
    };

    const handleVotePost = async (postId: string, voteType: Vote) => {
        try {
            const response = await postRepository.toggleVotes({
                session: session,
                voteType: voteType,
                postId: postId,
            } as TogglePostVotesReq);
            const updatedPost = Post.fromObject(response);

            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === postId ? updatedPost : post))
            );
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onClickOnCreatePost = () => {
        navigate("/new-post");
    }

    return {
        user,
        posts,
        onProfileClick,
        onClickOnAvatar,
        onClickOnComments,
        onClickOnPost,
        handleVotePost,
        onClickOnCreatePost
    };
}
