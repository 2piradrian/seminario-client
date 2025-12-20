import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import { useScrollLoading } from "../../hooks/useScrollLoading";
import { Errors, Event, PageProfile, Post, PostType, Profile, User, Vote, type GetFeedPageReq, type GetPageByUserIdReq, type GetUserByIdReq, type TogglePostVotesReq } from "../../../domain";
import useSession from "../../hooks/useSession";
import toast from "react-hot-toast";

export default function ViewModel() {

    const navigate = useNavigate();

    const { trigger } = useScrollLoading();
    const { userId, session } = useSession();
    const { userRepository, resultRepository, postRepository, pageRepository, sessionRepository, catalogRepository } = useRepositories();

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
            if (session != null && userId != null) {
                await fetchProfile();
                /* await fetchPages(); */
                await fetchPosts();
                await fetchPostTypes();
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

    const onClickOnCreatePost = () => {
        navigate("/new-post");
    }

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
        cancelDelete
    };
}
