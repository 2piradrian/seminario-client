import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Errors, Page, Post, Status, UserProfile, type GetOwnProfileReq, type GetOwnProfileRes } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";

export default function ViewModel() {
    
    const { sesion } = useSesion();
    const { trigger } = useScrollLoading();
    const { userProfileRepository } = useRepositories();

    const [page, setPage] = useState<Page | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
    useEffect(() => {
        //aca iría la llamada al backend para traer el numero de página
    }, [trigger]);

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
                setPage(null); // TODO: Change it
            }
        }
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    const onClickOnComments = () => {};
    const onClickOnAvatar = () => {};
    const onDownVote = () => {};
    const onUpVote = () => {};

    const posts: Post[] = [];
    const comments: Comment[] = [];

    return {
        toggleFollow,
        isFollowing,
        page,
        trigger,
        onClickOnComments,
        onClickOnAvatar,
        onDownVote,
        onUpVote,
        posts,
        comments,
    };
}