import { useNavigate } from "react-router-dom";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import useSession from "../../hooks/useSession";
import { PrefixedUUID, useRepositories } from "../../../core";
import { useEffect, useState } from "react";
import { EntityType, Errors, Event, PageProfile, Post, PostType, User, Vote, type GetSearchResultFilteredReq, type GetUserByIdReq, type TogglePostVotesReq
    } from "../../../domain";
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

    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (session && userId) {
                await fetchProfile();
                await fetchPostTypes();
                await fetchPosts();
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
        setIsDeleteOpen(true);
    };

    const onClickCancel = (item: Post) => {
        setSelectedItemId(item.id);
        setIsCancelOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteOpen(false);
        setSelectedItemId(null);
    };

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
        cancelDelete
    };
}
