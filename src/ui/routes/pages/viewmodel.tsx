import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useEffect, useState } from "react";
import { PrefixedUUID, useRepositories } from "../../../core";
import { EntityType, Errors, Event, Post, PostType, User, Vote, type GetFeedMergedByProfileIdPageReq, type GetSearchResultFilteredReq, type GetUserByIdReq, 
    type TogglePostVotesReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository, sessionRepository, catalogRepository } = useRepositories();

    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [items, setItems] = useState<Array<Event | Post>>([]); 
    const [page, setPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    
    const [user, setUser] = useState<User | null>(null);

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null && userId != null) {
                await fetchProfile();
                await fetchPagesFeed();
                await fetchPostTypes();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            setPage(trigger);
        }
    }, [trigger]);

    const fetchPagesFeed = async () => {
        try {
            const response = await resultRepository.getMergedFeedPage(
                { page: page, size: 15, session: session} as GetFeedMergedByProfileIdPageReq
            );

            const mappedItems = response.content.map(item => {
                if ("postType" in item) {
                    return Post.fromObject(item);
                }
                return Event.fromObject(item);
            });

            setItems(mappedItems);

        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPostTypes = async () => {
        try {
            const response = await catalogRepository.getAllPostType();
            const postTypesEntities = response.postTypes.map(pt =>
                PostType.fromObject(pt)
            );
            setPostTypes(postTypesEntities);
        } 
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

    const fetchProfile = async () => {
        try {
            const userResponse = await userRepository.getById({
                session: session, userId
            } as GetUserByIdReq);

            const userEntity = User.fromObject(userResponse);
            setUser(userEntity);
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatarItem = (item: Event | Post) => {
        if (PrefixedUUID.resolveType(item.id) === EntityType.POST) {
            if (item.author?.id && !item.pageProfile?.id) {
                navigate(`/user/${item.author.id}`);
                return;
            }
            if (item.pageProfile?.id) {
                navigate(`/page/${item.pageProfile.id}`);
                return;
            }
        }

        if (PrefixedUUID.resolveType(item.id) === EntityType.EVENT) {
            if (item.author?.id && !item.pageProfile?.id) {
                navigate(`/user/${item.author.id}`);
                return;
            }
            if (item.pageProfile?.id) {
                navigate(`/page/${item.pageProfile.id}`);
                return;
            }
        }
    };

    const onClickOnComments = (item: Event | Post) => {
        if (PrefixedUUID.resolveType(item.id) !== EntityType.POST) return;

        navigate(`/post-detail/${item.id}`);
    };


    const onClickOnItem = (item: Event | Post) => {
        if (PrefixedUUID.resolveType(item.id) === EntityType.POST) {
            navigate(`/post-detail/${item.id}`);
            return;
        }

        if (PrefixedUUID.resolveType(item.id) === EntityType.EVENT) {
            navigate(`/event-detail/${item.id}`);
            return;
        }
    };

    const handleVotePost = async (item: Event | Post, voteType: Vote) => {
    if (PrefixedUUID.resolveType(item.id) !== EntityType.POST) return;

    try {
        const response = await postRepository.toggleVotes({
            session,
            voteType,
            postId: item.id,
        } as TogglePostVotesReq);

        const updatedPost = Post.fromObject(response);

        setItems(prev =>
            prev.map(i =>
                PrefixedUUID.resolveType(i.id) === EntityType.POST &&
                i.id === item.id
                    ? updatedPost
                    : i
            )
        );
    } catch (error) {
        toast.error(
            error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
        );
    }
};


    const onClickDelete = (item: Event | Post) => {
        setSelectedItemId(item.id);
        setIsDeleteOpen(true);
    };

    const onClickCancel = (item: Event | Post) => {
        setSelectedItemId(item.id);
        setIsCancelOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItemId(null);
    };


    const onLogout = async () => {
        try {
            await sessionRepository.deleteSession()

            toast.success("Sesión cerrada")
            navigate("/login", { replace: true})
        }
        catch (e) {
            toast.error("No se pudo cerrar sesión")
        }
    }


    return {
        user,
        items,
        onProfileClick,
        onClickOnAvatarItem,
        onClickOnItem,
        onClickOnComments,
        handleVotePost,
        onLogout,
        postTypes,
        onClickCancel,
        onClickDelete,
        cancelDelete,
    };
}