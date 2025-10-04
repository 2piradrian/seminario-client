import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
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

    const onClickOnComments = () => {};
    const onClickOnAvatar = () => {};
    const onDownVote = () => {};
    const onUpVote = () => {};

    return {
        goToEditProfile,
        profile,
        onClickOnComments,
        onClickOnAvatar,
        onDownVote,
        onUpVote,
        posts
    };
}