import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Post, type GetOwnProfileReq, type UserProfile } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const { sesion } = useSesion();
    const { trigger } = useScrollLoading();
    const { userProfileRepository } = useRepositories();

    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (sesion != null){
                await fetchProfile();
            }
        }
        fetchData();
    }, [sesion]);

    
    useEffect(() => {
        //aca iría la llamada al backend para traer el numero de página
    }, [trigger]);

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
    const posts: Post[] = [];

    return {
        goToEditProfile,
        profile,
        trigger,
        onClickOnComments,
        onClickOnAvatar,
        onDownVote,
        onUpVote,
        posts
    };
}