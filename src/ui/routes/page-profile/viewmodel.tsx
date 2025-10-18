import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Vote, Errors, PageProfile, Post, UserProfile, type GetPageByIdReq, type TogglePostVotesReq, type DeletePostReq, type GetPostPageByProfileReq } from "../../../domain";
import useSession from "../../hooks/useSession.tsx";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {
    
    const navigate = useNavigate();

    const { id } = useParams();
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    const { pageRepository, postRepository } = useRepositories();

    const [pageProfile, setPageProfile] = useState<PageProfile | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
    
    useEffect(() => {
        if (postPage != null && session != null) {
            setPostPage(trigger);
            fetchPosts().then();
        }
    }, [trigger]);

     useEffect(() => {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            if (session) { 
                await fetch();
                await fetchPosts();
            }
        };
        fetchData().then();
    }, [id, session]);

    const isMine = useMemo(() => {
        if (!profile || !userId) return false
        return profile.id === userId
    }, [profile, userId])    

    const fetch = async () => {
        try {
            const profile = await pageRepository.getById({
                pageId: id
            } as GetPageByIdReq);
            
            const pageProfile = PageProfile.fromObject(profile);
            setPageProfile(pageProfile);
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getPostPageByProfile(
                { page: postPage, size: 15, profileId: id, session: session } as GetPostPageByProfileReq
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

    const onClickOnPost = (postId: string) => {
        if (!profile) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnComments = (postId: string) => {
        if (!profile) return;
        navigate(`/post-detail/${postId}`)
    };
    
    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const onFollowersClick = () => {
        if (!profile) return;
        navigate(`/user/${profile.id}/followers`);
    };

    const onClickOnAvatar = () => {};
    const onClickDelete = () => {}; // TO DO: Delete page-profile

    return {
        toggleFollow,
        isFollowing,
        pageProfile,
        trigger,
        onFollowersClick,
        onClickOnComments,
        onClickOnAvatar,
        handleVotePost,
        onClickDelete,
        posts,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost
    };
}