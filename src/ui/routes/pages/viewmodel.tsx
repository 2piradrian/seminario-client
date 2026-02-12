import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useEffect, useMemo, useState } from "react";
import { PrefixedUUID, useRepositories } from "../../../core";
import { EntityType, Errors, Event, Post, PostType, Role, User, Vote, type GetFeedMergedByProfileIdPageReq, type GetSearchResultFilteredReq, type GetUserByIdReq, 
    type TogglePostVotesReq, ModerationReason, type DeletePostReq, type DeleteEventReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository, eventRepository, sessionRepository, catalogRepository } = useRepositories();

    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [items, setItems] = useState<Array<Event | Post>>([]); 
    const [page, setPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    
    const [user, setUser] = useState<User | null>(null);
    const [moderationReasons, setModerationReasons] = useState<ModerationReason[]>([]);
    const [selectedDeleteReason, setSelectedDeleteReason] = useState<string>("Seleccionar");

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (session != null && userId != null) {
                await fetchProfile();
                await fetchPagesFeed();
                await fetchPostTypes();
                await fetchModerationReasons();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            setPage(trigger);
        }
    }, [trigger]);

    const isMine = useMemo(() => {
        if (!user || !userId) return false
        return user.id === userId
    }, [user, userId])

    const isAdminOrMod = useMemo(() => {
        return user?.role === Role.ADMIN || user?.role === Role.MODERATOR;
    }, [user]);

    const isAdmin = useMemo(() => {
        return user?.role === Role.ADMIN;
    }, [user]);

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

    const fetchModerationReasons = async () => {
        try {
            const response = await catalogRepository.getAllModerationReason();
            const reasonsFromRes = response.moderationReasons.map(r => ModerationReason.fromObject(r));
            setModerationReasons(reasonsFromRes);
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
        setSelectedDeleteReason("Seleccionar");
        setIsDeleteOpen(true);
    };

    const onClickCancel = (item: Event | Post) => {
        setSelectedItemId(item.id);
        setIsCancelOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItemId(null);
        setSelectedDeleteReason("Seleccionar");
    };

    const isItemMine = (item: Post | Event) => {
        if (!item || !userId) return false;
        return item.author?.id === userId || item.pageProfile?.owner?.id === userId;
    };

    const selectedItem = useMemo(() => {
        if (!selectedItemId) return null;
        return items.find(item => item.id === selectedItemId) ?? null;
    }, [items, selectedItemId]);

    const isSelectedItemMine = useMemo(() => {
        if (!selectedItem) return false;
        return isItemMine(selectedItem);
    }, [selectedItem, userId]);

    const shouldShowDeleteReasonSelector = useMemo(() => {
        return isAdminOrMod && !isSelectedItemMine;
    }, [isAdminOrMod, isSelectedItemMine]);

    const moderationReasonOptions = useMemo(() => {
        return moderationReasons.map(r => r.name);
    }, [moderationReasons]);

    const onClickEdit = (item: Event | Post) => {
        const itemType = PrefixedUUID.resolveType(item.id);
        if (itemType === EntityType.POST) {
            navigate(`/edit-post/${item.id}`);
            return;
        }
        if (itemType === EntityType.EVENT) {
            navigate(`/edit-event/${item.id}`);
        }
    };

    const proceedDelete = async () => {
        if (!selectedItem) return;

        try {
            let reasonId = "";
            if (isAdminOrMod && !isSelectedItemMine) {
                const reason = moderationReasons.find(r => r.name === selectedDeleteReason);
                if (!reason) {
                    toast.error("Selecciona un motivo de eliminación");
                    return;
                }
                reasonId = reason.id;
            }

            const itemType = PrefixedUUID.resolveType(selectedItem.id);
            if (itemType === EntityType.POST) {
                await postRepository.delete({
                    session,
                    postId: selectedItem.id,
                    reasonId
                } as DeletePostReq);
            }

            if (itemType === EntityType.EVENT) {
                await eventRepository.delete({
                    session,
                    eventId: selectedItem.id,
                    reasonId
                } as DeleteEventReq);
            }

            setItems(prev => prev.filter(item => item.id !== selectedItem.id));
            toast.success("Contenido borrado exitosamente");
            setIsDeleteOpen(false);
            setSelectedItemId(null);
            setSelectedDeleteReason("Seleccionar");
        }
        catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

    const onToggleMenu = (id: string) => {
        if (activeMenuId === id) {
            setActiveMenuId(null);
        } else {
            setActiveMenuId(id);
        }
    };

    const onCloseMenu = () => setActiveMenuId(null);


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
        onClickEdit,
        proceedDelete,
        cancelDelete,
        isMine,
        isItemMine,
        isAdmin,
        isAdminOrMod,
        isDeleteOpen,
        moderationReasonOptions,
        selectedDeleteReason,
        setSelectedDeleteReason,
        shouldShowDeleteReasonSelector,
        activeMenuId,
        onCloseMenu,
        onToggleMenu
    };
}
