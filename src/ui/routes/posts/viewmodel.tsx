import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { useRepositories } from "../../../core";
import { useEffect, useMemo, useState } from "react";
import { EntityType, Errors, Event, PageProfile, Post, PostType, Role, User, Vote, type GetSearchResultFilteredReq, type GetUserByIdReq, type TogglePostVotesReq
    , ModerationReason, type DeletePostReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const {
        userRepository,
        resultRepository,
        postRepository,
        sessionRepository,
        catalogRepository
    } = useRepositories();

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
            if (session && userId) {
                await fetchProfile();
                await fetchPostTypes();
                await fetchPosts();
                await fetchModerationReasons();
            }
        };
        fetchData().then();
    }, [session]);

    useEffect(() => {
        if (canScroll && session) {
            setPostPage(trigger);
        }
    }, [trigger]);

    useEffect(() => {
        if (session) {
            fetchPosts().then();
        }
    }, [postPage]);

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
            const postsRes = await resultRepository.getSearchResult({
                page: postPage,
                size: 15,
                contentTypeId: "post",
                session
            } as GetSearchResultFilteredReq);

            if (!postsRes.posts || postsRes.posts.length === 0) {
                setCanScroll(false);
                if (postPage === 1) setPosts([]);
                return;
            }

            const newPosts = postsRes.posts.map(Post.fromObject);

            setPosts(prev =>
                postPage === 1 ? newPosts : [...prev, ...newPosts]
            );
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
            toast.error(error instanceof Error ? error.message : Errors.UNKNOWN_ERROR);
        }
    }

    const fetchProfile = async () => {
        try {
            const userResponse = await userRepository.getById({
                session,
                userId
            } as GetUserByIdReq);

            setUser(User.fromObject(userResponse));
        } catch (error) {
            toast.error(error ? (error as string) : Errors.UNKNOWN_ERROR);
        }
    };

    const onProfileClick = (profileId: string) => {
        navigate(`/user/${profileId}`);
    };

    const onClickOnAvatar = (post: Post) => {
        if (post.author?.id && !post.pageProfile?.id) {
            navigate(`/user/${post.author.id}`);
        } else if (post.pageProfile?.id) {
            navigate(`/page/${post.pageProfile.id}`);
        }
    };

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


    const onClickOnCreatePost = () => {
        navigate("/new-post");
    };

    const onClickDelete = (item: Post) => {
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
        navigate(`/edit-post/${item.id}`);
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

            await postRepository.delete({
                session,
                postId: selectedItem.id,
                reasonId
            } as DeletePostReq);

            setPosts(prev => prev.filter(item => item.id !== selectedItem.id));
            toast.success("Publicación borrada exitosamente");
            setIsDeleteOpen(false);
            setSelectedItemId(null);
            setSelectedDeleteReason("Seleccionar");
        } catch (error) {
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
            await sessionRepository.deleteSession();
            toast.success("Sesión cerrada");
            navigate("/login", { replace: true });
        } catch {
            toast.error("No se pudo cerrar sesión");
        }
    };

    return {
        user,
        pages,
        posts,
        postTypes,
        onProfileClick,
        onClickOnAvatar,
        onClickOnComments,
        onClickOnPost,
        handleVotePost,
        onClickOnCreatePost,
        onLogout,
        onClickCancel,
        onClickDelete,
        onClickEdit,
        cancelDelete,
        proceedDelete,
        isMine,
        isItemMine,
        isAdmin,
        isAdminOrMod,
        onToggleMenu,
        activeMenuId,
        onCloseMenu,
        isDeleteOpen,
        moderationReasonOptions,
        selectedDeleteReason,
        setSelectedDeleteReason,
        shouldShowDeleteReasonSelector
    };
}
