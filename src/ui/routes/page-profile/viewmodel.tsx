import { useEffect, useState } from "react";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Comment, Errors, Page, Post, type GetPageByIdReq } from "../../../domain";
import useSesion from "../../hooks/useSesion";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewModel() {
    
    const navigate = useNavigate();

    const { id } = useParams();
    //const { sesion } = useSesion();
    const { trigger } = useScrollLoading();
    const { pageRepository } = useRepositories();

    const [pageProfile, setPageProfile] = useState<Page | null>(null);
    const [isFollowing, setIsFollowing] = useState(false);
    
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

    const fetch = async () => {
        try {
            const profile = await pageRepository.getById({
                pageId: id
            } as GetPageByIdReq);

            const pageProfile = Page.fromObject(profile);
            setPageProfile(pageProfile);
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
        pageProfile,
        trigger,
        onClickOnComments,
        onClickOnAvatar,
        onDownVote,
        onUpVote,
        posts,
        comments,
    };
}