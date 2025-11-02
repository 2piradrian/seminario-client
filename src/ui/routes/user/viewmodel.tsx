import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type DeletePostReq, Errors, type GetPostPageByProfileReq, type GetUserByIdReq, Post, type ToggleFollowReq, type TogglePostVotesReq, User, UserProfile, Vote } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();

    const { id } = useParams();
    const { userRepository, followRepository, postRepository } = useRepositories();
    const { userId, session } = useSession();

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [user, setUser] = useState<User | null>(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            if (session) { 
                await fetchUser();
                await fetchPosts();
            }
        };
        fetchData().then();
    }, [id, session]);

    const isMine = useMemo(() => {
            if (!user || !userId) return false
            return user.id === userId
        }, [user, userId])

    const fetchUser = async () => {
        try {
            const response = await userRepository.getUserById({
                session: session,
                userId: id
            } as GetUserByIdReq);

            setUser(User.fromObject(response));
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
                    ...postsRes.posts
                    .map(post => Post.fromObject(post))
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
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

    const toggleFollow = async () => {
        try {
            await followRepository.toggleFollow({
                session: session,
                id: id
            } as ToggleFollowReq);

            if (user.profile.isFollowing) {
                updateFollowsCounter(false, -1)

            }
            else {
                updateFollowsCounter(true, 1)
            }
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const updateFollowsCounter = (follow: boolean, quantity: number) => {
        const updated: UserProfile = {
            ...user.profile,
            followersQuantity: user.profile.followersQuantity + quantity,
            isFollowing: follow
        };

        setUser({...user, profile: updated} as User);
    }

    const onClickOnPost = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!user) return;
        navigate(`/post-detail/${postId}`)
    };
    
    const onClickOnAvatar = (post: Post) => {
        if (!post || !post.author) return;
        if (post.pageProfile.id) {
            navigate(`/page/${post.pageProfile.id}`);
        }
    };

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


    const onFollowersClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/followers`);
    };

    const onFollowingClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/following`);
    };

    const onClickOnCreatePost = () => {
        if (!userId) return;
        navigate("/new-post");
    };

    const onClickOnCreatePage = () => {
        if (!userId) return;
        navigate("/new-page");
    };

    const onClickOnEditProfile = () => {
        navigate("/profile/edit");
    };

    return {
        toggleFollow,
        user,
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
        isDeleteOpen,
        onClickOnCreatePage,
        onClickOnCreatePost,
        onClickOnEditProfile
    };
}