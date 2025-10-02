import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Errors, Post, type GetOwnProfileReq, type GetOwnProfileRes, type UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";
export default function ViewModel() {
    
    const { sesion } = useSesion();
    const { userProfileRepository } = useRepositories();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            if (sesion != null){
                await fetchProfile();
            }
        }
        fetchData();
    }, [sesion]);

    const fetchProfile = async () => {
        try {
            const getOwnProfileReq: GetOwnProfileReq = {
                sesion: sesion,
            };
            const profile: GetOwnProfileRes = await userProfileRepository.getOwnProfile(getOwnProfileReq);

            if (profile) {
                setProfile(profile);
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };
    

    const { trigger } = useScrollLoading();
    
    useEffect(() => {
        //aca iría la llamada al backend para traer el numero de página
    }, [trigger]);

    const onClickOnComments = () => {};
    const onClickOnAvatar = () => {};
    const onDownVote = () => {};
    const onUpVote = () => {};

    const posts: Post[] = [];
    const comments: Comment[] = [];

    return {
        toggleFollow,
        isFollowing,
        profile,
        trigger,
        onClickOnComments,
        onClickOnAvatar,
        onDownVote,
        onUpVote,
        posts,
        comments,
    };
}