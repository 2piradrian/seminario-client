import { useEffect, useMemo, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Vote, Errors, PageProfile, Post, UserProfile, type GetPageByIdReq, type TogglePostVotesReq } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {
    
    const navigate = useNavigate();

    const { id } = useParams();
    const { userId, sesion } = useSesion();
    const { trigger } = useScrollLoading();
    const { pageRepository, postRepository } = useRepositories();

    const [pageProfile, setPageProfile] = useState<PageProfile | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    
    useEffect(() => {
        //aca iría la llamada al backend para traer el numero de página
    }, [trigger]);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) navigate("/error-404");
            await fetch();
        }
        fetchData();
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
                sesion: sesion,
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
        isMine
    };
}