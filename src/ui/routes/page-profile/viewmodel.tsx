import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Vote, Errors, PageProfile, Post, UserProfile, type GetPageByIdReq, type TogglePostVotesReq, type DeletePostReq } from "../../../domain";
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

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
    
    useEffect(() => {
        //aca iría la llamada al backend para traer el numero de página
    }, [trigger]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            await fetch();
        }
        fetchData().then();
    }, []);

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

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
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

    const onClickOnComments = () => {};
    const onClickOnAvatar = () => {};
    const onClickDelete = () => {};
    const onFollowersClick = () => {};

    const comments: Comment[] = [];

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
        comments,
        isMine,
        cancelDelete,
        proceedDelete,
        isDeleteOpen,
        onClickOnPost
    };
}