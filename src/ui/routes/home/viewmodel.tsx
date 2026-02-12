import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Event, PageProfile, Post, PostType, Profile, Role, User, Vote, ModerationReason, EntityType, type DeleteEventReq, type DeletePostReq, type GetFeedPageReq, type GetPageByUserIdReq, type GetUserByIdReq, type TogglePostVotesReq } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";
import { PrefixedUUID } from "../../../core";

export default function ViewModel() {

    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository, eventRepository, pageRepository, sessionRepository, catalogRepository } = useRepositories();

    const [posts, setPosts] = useState<Post[]>([]);
    const [postTypes, setPostTypes] = useState<PostType[]>([]);

    const [postPage, setPostPage] = useState<number>(1);
    const [canScroll, setCanScroll] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [pages, setPages] = useState<PageProfile[]>([]);
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
                /* await fetchPages(); */
                await fetchPosts();
                await fetchPostTypes();
                await fetchModerationReasons();
            }
        }
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session != null) {
            setPostPage(trigger);
            fetchPosts().then();
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
    
    const fetchPosts = async () => {
        try {
            const postsRes = await resultRepository.getFeedPost(
                { page: postPage, size: 15, session: session } as GetFeedPageReq
            );
            if (!postsRes.posts || postsRes.posts.length === 0) {
                setCanScroll(false);
                if (postPage === 1) setPosts([]);
                return;
            }
            if (postPage === 1) {
                setPosts(postsRes.posts.map(Post.fromObject));
            } 
            else {
                setPosts(prevPosts => [
                    ...prevPosts,
                    ...postsRes.posts.map(Post.fromObject)
                ]);
            }
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPostTypes = async () => {
        try {
            const response = await catalogRepository.getAllPostType();
            const postTypesFromRes = response.postTypes.map(pt => PostType.fromObject(pt));
            setPostTypes(postTypesFromRes);            
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const fetchModerationReasons = async () => {
        try {
            const response = await catalogRepository.getAllModerationReason();
            const reasonsFromRes = response.moderationReasons.map(r => ModerationReason.fromObject(r));
            setModerationReasons(reasonsFromRes);
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const fetchProfile = async () => {
        try {
            const userResponse = await userRepository.getById({
                session: session, userId
            } as GetUserByIdReq);

            const userEntity = User.fromObject(userResponse);
            setUser(userEntity);

            if (userEntity) {
                setUser(userEntity);
            }
        } 
        catch (error) {
            toast.error(error ? error as string : Errors.UNKNOWN_ERROR);
        }
    };

    const fetchPages = async () => {
        try {
            const pagesResponse = await pageRepository.getByUserId(
                { session, userId: user.id } as GetPageByUserIdReq
            );
            const pages = pagesResponse.pages.map(p => PageProfile.fromObject(p));
            const pagesEntities = []
            pages.forEach((page: PageProfile) => {
                pagesEntities.push(page.toProfile());
            });

            setPages(pagesEntities);
        } 
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatar = (post : Post) => {
        if (post.author?.id && !post.pageProfile?.id){
            navigate(`/user/${post.author.id}`);
        }
        else if (post.pageProfile?.id){
            navigate(`/page/${post.pageProfile.id}`);
        }     
    }

    const onClickOnComments = (item: Post) => {
        navigate(`/post-detail/${item.id}`);
    }; 

    const onClickOnPost = (item: Post) => {
        navigate(`/post-detail/${item.id}`);
    };

    const handleVotePost = async (item: Post, voteType: Vote) => {
        try {
            const response = await postRepository.toggleVotes({
                session,
                postId: item.id,
                voteType
            } as TogglePostVotesReq);

            const updatedPost = Post.fromObject(response);

            setPosts(prev =>
                prev.map(post =>
                    post.id === item.id ? updatedPost : post
                )
            );
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : Errors.UNKNOWN_ERROR
            );
        }
    };

    const handleSharePost = async (postId: string) => {
            if (!postId) return;
    
            const url = `${window.location.origin}/post-detail/${postId}`;
    
            try {
                await navigator.clipboard.writeText(url);
                
                toast.success("¡Enlace copiado al portapapeles!");
            } catch (error) {
                toast.error("No se pudo copiar el enlace");
            }
    };

    const onClickOnCreatePost = () => {
        navigate("/new-post");
    }

    const onClickDelete = (item: Post | Event) => {
        setSelectedItemId(item.id);
        setSelectedDeleteReason("Seleccionar");
        setIsDeleteOpen(true);
    };

    const onClickCancel = (item: Post) => {
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
        return posts.find(item => item.id === selectedItemId) ?? null;
    }, [posts, selectedItemId]);

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

    const onClickEdit = (item: Post | Event) => {
        const entityType = PrefixedUUID.resolveType(item.id);
        if (entityType === EntityType.POST) {
            navigate(`/edit-post/${item.id}`);
            return;
        }

        if (entityType === EntityType.EVENT) {
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

            const entityType = PrefixedUUID.resolveType(selectedItem.id);

            if (entityType === EntityType.POST) {
                await postRepository.delete({
                    session,
                    postId: selectedItem.id,
                    reasonId
                } as DeletePostReq);
            }

            if (entityType === EntityType.EVENT) {
                await eventRepository.delete({
                    session,
                    eventId: selectedItem.id,
                    reasonId
                } as DeleteEventReq);
            }

            setPosts(prev => prev.filter(item => item.id !== selectedItem.id));
            toast.success("Contenido borrado exitosamente");
            setIsDeleteOpen(false);
            setSelectedItemId(null);
            setSelectedDeleteReason("Seleccionar");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
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
        pages,
        posts,
        onProfileClick,
        onClickOnAvatar,
        onClickOnComments,
        onClickOnPost,
        handleVotePost,
        onClickOnCreatePost,
        onLogout,
        postTypes,
        onClickCancel,
        onClickDelete,
        onClickEdit,
        cancelDelete,
        proceedDelete,
        handleSharePost,
        isAdmin,
        isAdminOrMod,
        isMine,
        isItemMine,
        onCloseMenu,
        onToggleMenu,
        activeMenuId,
        isDeleteOpen,
        moderationReasonOptions,
        selectedDeleteReason,
        setSelectedDeleteReason,
        shouldShowDeleteReasonSelector
    };
}
