import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Post, Vote, type GetOwnProfileReq, type TogglePostVotesReq, type UserProfile } from "../../../domain";
import type { GetFeedPostPageReq } from "../../../domain/dto/result/request/GetFeedPageReq";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();
    const { userId, session } = useSession();
    const { trigger } = useScrollLoading();
    const { userProfileRepository, resultRepository, postRepository } = useRepositories();

    const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [postPage, setPostPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null) {
                await fetchProfile();
                await fetchPosts();
            }
            setLoading(false);
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            setPostPage(prev => prev + 1);
            fetchPosts().then();
            console.log(session)
            console.log(userId)
        }
    }, [trigger]);

    const isMine = useMemo(() => {
        if (!activeProfile || !userId) return false;
        return activeProfile.id === userId;
    }, [activeProfile, userId]);

    const fetchPosts = async () => {
        try {
            const postsRes = await resultRepository.getFeedPost(
                { page: postPage, size: 15, session: session} as GetFeedPostPageReq);

            if (!postsRes.posts || postsRes.posts.length === 0) {
                setCanScroll(false);
                if (postPage === 1) setPosts([]);
                return;
            }

            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            } else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts.map(post => Post.fromObject(post))
                ]);
            }
        } catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchProfile = async () => {
        try {
            const profile = await userProfileRepository.getOwnProfile({
                session: session,
            } as GetOwnProfileReq);

            if (profile) {
                setActiveProfile(profile);
            }
        } catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatar = () => {
        if (!activeProfile) return;
        navigate(`/user/${activeProfile.id}`);
    };

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
        } catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    };
    
    return {
        activeProfile,
        posts,
        loading,
        isMine,
        onProfileClick,
        onClickOnAvatar,
        onClickOnComments,
        onClickOnPost,
        handleVotePost,
    };
}
