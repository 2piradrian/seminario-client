import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Vote } from "../../../domain";
import type { TogglePostVotesReq, GetPostByIdReq } from "../../../domain";
import { Errors, Post, type GetOwnPostPageReq, type GetOwnProfileReq, type UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { sesion } = useSesion();
    const { trigger } = useScrollLoading();
    const { userProfileRepository, postRepository } = useRepositories();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number | null>(1);

    const [post, setPost] = useState<Post | null>(null);
    const [vote, setVote] = useState(false);
    const [votesCount, setVotesCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            if (sesion != null){
                await fetchProfile();
            }
        }
        fetchData();
    }, [sesion]);

    useEffect(() => {
        if (postPage != null && sesion != null) {
            setPostPage(trigger);
            fetchPosts();
        }
    }, [trigger]);
    
    const fetchPosts = async() => {
        try {
            const postsRes = await postRepository.getOwnPostPage(
                {sesion: sesion, page: postPage, size: 15} as GetOwnPostPageReq
            );

            if (!postsRes.nextPage) {
                setPostPage(null);
            }
            setPosts(postsRes.posts)
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR)
        }
    };

    const fetchProfile = async () => {
        try {
            const profile = await userProfileRepository.getOwnProfile({
                sesion: sesion,
            } as GetOwnProfileReq);

            if (profile) {
                setProfile(profile);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    const onClickOnPost = (postId: string) => {
        if (!profile) return;
        navigate(`/post-detail/${postId}`);
    };

    const onClickOnComments = () => {};
    const onClickOnAvatar = () => {};
    const onClickDelete = () => {};

    const onDownVote = async (postId) => {
        try {
            // NO SE ACTUALIZA ATT: Junior del backend
                await postRepository.toggleVotes({
                    sesion: sesion,
                    voteType: Vote.DOWNVOTE,
                    postId: postId,
                } as TogglePostVotesReq)
            }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };

    const onUpVote = async (postId) => {
        try {
            // NO SE ACTUALIZA ATT: Junior del backend
            await postRepository.toggleVotes({
                sesion: sesion,
                voteType: Vote.UPVOTE,
                postId: postId,
            } as TogglePostVotesReq)
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };


    return {
        goToEditProfile,
        profile,
        onClickOnComments,
        onClickOnAvatar,
        onClickDelete,
        onDownVote,
        onUpVote,
        posts,
        onClickOnPost
    };
}
