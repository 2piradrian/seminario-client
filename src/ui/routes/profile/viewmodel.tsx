import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Post, Vote, type GetOwnPostPageReq, type TogglePostVotesReq, type DeletePostReq, type GetUserByIdReq, User } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    const { userProfileRepository, postRepository } = useRepositories();

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            if (session != null){
                await fetchUser();
                //await fetchPosts();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (postPage != null && session != null) {
            setPostPage(trigger);
            //fetchPosts().then();
        }
    }, [trigger]);

    const isMine = useMemo(() => {
        if (!user || !userId) return false
        return user.id === userId
    }, [user, userId])
    
    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getOwnPostPage(
                { session: session, page: postPage, size: 15 } as GetOwnPostPageReq
            );
            if (!postsRes.nextPage) setPostPage(null);
            
            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            }
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts
                    .filter(post => post.author?.id === userId)
                    .map(post => Post.fromObject(post))
                ]);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchUser = async () => {
        try {
            const response = await userProfileRepository.getUserById({
                session: session,
                userId: userId!
            } as GetUserByIdReq);
            if (response) {
                setUser(User.fromObject(response));
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    const onClickOnCreatePost = () => {
        navigate("/new-post");
    };

    const onClickOnCreatePage = () => {
        navigate("/new-page");
    };

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
        if (!user) return;
        navigate(`/user/${user.id}/followers`);
    };

    const onFollowingClick = () => {
        if (!user) return;
        navigate(`/user/${user.id}/following`);
    };
    
    return {
        goToEditProfile,
        user,
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
        onFollowersClick,
        onFollowingClick,
        onClickOnCreatePost,
        onClickOnCreatePage
    };
}
