import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useRepositories } from "../../../core";
import { type DeletePostReq, Errors , type GetOwnPostPageReq, type GetPostPageByProfileReq, type GetUserByIdReq, Post, type TogglePostVotesReq, UserProfile, Vote } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import { useNavigate, useParams } from "react-router-dom";
import type { ToggleFollowReq } from "../../../domain/dto/user/request/ToggleFollowReq";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userProfileRepository, postRepository } = useRepositories();
    const { userId, session } = useSession();

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            if (session) { 
                await fetchUserProfile();
                await fetchPosts();
            }
        };
        fetchData().then();
    }, [id, session]);

    const isMine = useMemo(() => {
            if (!userProfile || !userId) return false
            return userProfile.id === userId
        }, [userProfile, userId])

    const fetchUserProfile = async () => {
        try {
            const user = await userProfileRepository.getUserById({
                session: session,
                userId: id
            } as GetUserByIdReq);

            const userProfile = UserProfile.fromObject(user);
            setUserProfile(userProfile);
        }
        catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getPostPageByProfile(
                { session: session, page: postPage, size: 15, profileId: id } as GetPostPageByProfileReq
            );
            if (!postsRes.nextPage) setPostPage(null);
            
            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            }
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts.map(post => Post.fromObject(post))
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const toggleFollow = async () => {
        try {
            await userProfileRepository.toggleFollow({
                session: session,
                id: id
            } as ToggleFollowReq);

            if (userProfile.isFollowing) {    // Unfollow
                updateFollowsCounter(false, -1)

            }
            else {               // Follow
                updateFollowsCounter(true, 1)
            }
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const updateFollowsCounter = (follow: boolean, quantity: number) => {
        const updated: UserProfile = {
            ...userProfile,
            followersCount: userProfile.followersCount + quantity,
            isFollowing: follow
        };
        setUserProfile(updated);
    }

    const onClickOnPost = (postId: string) => {
        if (!userProfile) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!userProfile) return;
        navigate(`/post-detail/${postId}`)
    };
    
    const onClickOnAvatar = () => {};

    const onClickDelete = (postId: string) => {
        setSelectedPostId(postId)
        setIsDeleteOpen(true)
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false)
        setSelectedPostId(null)
    };

    const proceedDelete = async () => {
        if (!selectedPostId) return
        try {
            await postRepository.delete({
                session: session,
                postId: selectedPostId
            } as DeletePostReq);
            
            setPosts(prev => prev.filter(post => post.id !== selectedPostId))
            
            toast.success("Post borrado exitosamente")
            
            setIsDeleteOpen(false)
            setSelectedPostId(null)
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const handleVotePost = async (postId: string, voteType: Vote) => {
        try {
            const response = await postRepository.toggleVotes({
                session: session,
                voteType: voteType,
                postId: postId,
            } as TogglePostVotesReq)

            const updatedPost = Post.fromObject(response);

            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === postId ? updatedPost : post))
            );
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onFollowersClick = () => {
        if (!userProfile) return;
        navigate(`/user/${userProfile.id}/followers`);
    };

    const onFollowingClick = () => {
        if (!userProfile) return;
        navigate(`/user/${userProfile.id}/following`);
    };

    
    return {
        toggleFollow,
        userProfile,
        onFollowersClick,
        onFollowingClick,
        onClickOnComments,
        onClickOnAvatar,
        onClickDelete,
        handleVotePost,
        posts,
        onClickOnPost,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen
    };
}